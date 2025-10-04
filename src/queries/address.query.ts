import { addressApiRequest } from '@/api-requests';
import { AddressBodyType } from '@/types';
import { useMutation, useQuery } from '@tanstack/react-query';

export const usePublicAddressProvinceListQuery = () => {
  return useQuery({
    queryKey: ['public-address-province-list'],
    queryFn: () => addressApiRequest.getPublicProvinceList()
  });
};

export const usePublicAddressDistrictListQuery = (id: string) => {
  return useQuery({
    queryKey: ['public-address-district-list', id],
    queryFn: () => addressApiRequest.getPublicDistrictList(id),
    enabled: !!id
  });
};

export const usePublicAddressWardListQuery = (id: string) => {
  return useQuery({
    queryKey: ['public-address-ward-list', id],
    queryFn: () => addressApiRequest.getPublicWardList(id),
    enabled: !!id
  });
};

export const usePublicAddressHamletListQuery = ({
  city,
  district,
  input,
  state,
  enabled = false
}: {
  city: string;
  district: string;
  input: string;
  state: string;
  sessiontoken?: string;
  enabled: boolean;
}) => {
  return useQuery({
    queryKey: [
      'public-address-hamlet-query',
      {
        city,
        district,
        input,
        state
      }
    ],
    queryFn: () =>
      addressApiRequest.getPublicDetail({
        city,
        district,
        input,
        state
      }),
    enabled
  });
};

export const useCreateAddressMutation = () => {
  return useMutation({
    mutationKey: ['address-create'],
    mutationFn: (body: AddressBodyType) => addressApiRequest.create(body)
  });
};

export const useUpdateAddressMutation = () => {
  return useMutation({
    mutationKey: ['address-update'],
    mutationFn: (body: AddressBodyType) => addressApiRequest.update(body)
  });
};

export const useDeleteAddressMutation = () => {
  return useMutation({
    mutationKey: ['address-delete'],
    mutationFn: (id: string) => addressApiRequest.delete(id)
  });
};

export const useAddressQuery = (id: string) => {
  return useQuery({
    queryKey: ['address', id],
    queryFn: () => addressApiRequest.getById(id),
    enabled: !!id
  });
};

export const useAddressListQuery = () => {
  return useQuery({
    queryKey: ['address-list'],
    queryFn: () => addressApiRequest.getList()
  });
};

export const useSetDefaultAddressMutation = () => {
  return useMutation({
    mutationKey: ['address-set-default'],
    mutationFn: (id: string) => addressApiRequest.setDefault(id)
  });
};
