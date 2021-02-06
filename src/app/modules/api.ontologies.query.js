import { compact, prop, propOr } from 'lodash/fp';
import { useCallback, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import queryClient from '../configs/react-query/queryClient';
import OntologiesService from './api.ontologies.service';

export const queryKey = 'ONTOLOGIES';

export const bodyResponder = (response) => {
  const data = propOr({}, 'data', response);

  if (response.status !== 200) {
    return Promise.reject(new Error(data.errorDescriptions));
  }

  return data;
};

const fetchOntologies = ({ queryKey: [, filters] }) =>
  OntologiesService.fetch(filters).then(bodyResponder);

export function usePaginatedQueryOntologies(filters, opts) {
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 20,
    totalPages: 0,
    totalElements: 0
  });

  const queryKeys = compact([
    queryKey,
    { ...filters, page: pagination.page, pageSize: pagination.pageSize }
  ]);

  // We need this func memoized to keep pure childs (Table) avoid extra renders.
  const fetchPage = useCallback((page) => {
    setPagination((pag) => ({ ...pag, page }));
  }, []);

  // We need this func memoized to keep pure childs (Table) avoid extra renders.
  const changeSizePage = useCallback((page, pageSize) => {
    setPagination((pag) => ({ ...pag, page, pageSize }));
  }, []);

  const state = useQuery(queryKeys, fetchOntologies, {
    ...opts
  });

  // This useEffect stops executing when totalElements are received.
  useEffect(() => {
    const totalElements = prop('data.page.totalElements', state);
    // eslint-disable-next-line no-unused-expressions
    totalElements !== undefined
      ? setPagination({
          ...pagination,
          totalElements: prop('data.page.totalElements', state),
          totalPages: prop('data.page.totalPages', state)
        })
      : null;
  }, [prop('data.page.totalElements', state)]);

  // Prefetches next page for better perfomance.
  useEffect(() => {
    const hasMore =
      pagination.page <
      Math.ceil(pagination.totalElements / pagination.pageSize);

    if (hasMore) {
      queryClient.prefetchQuery(
        [
          queryKey,
          {
            ...filters,
            page: pagination.page + 1,
            pageSize: pagination.pageSize
          }
        ],
        fetchOntologies
      );
    }
  }, [pagination.page, pagination.pageSize, pagination.totalPages]);

  return {
    state,
    pagination,
    fetchPage,
    changeSizePage
  };
}
