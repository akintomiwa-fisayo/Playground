// Generated React Query Hooks
// This file was auto-generated. Add custom code in the marked sections.

import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';

import apiClient from './clients';
import type {
  IupdatePetDTO,
  IupdatePet200Response,
  IaddPetDTO,
  IaddPet200Response,
  IfindPetsByStatusQuery,
  IfindPetsByStatus200Response,
  IfindPetsByTagsQuery,
  IfindPetsByTags200Response,
  IgetPetById200Response,
  IupdatePetWithFormQuery,
  IupdatePetWithForm200Response,
  IuploadFileQuery,
  IuploadFileDTO,
  IuploadFile200Response,
  IgetInventory200Response,
  IplaceOrderDTO,
  IplaceOrder200Response,
  IgetOrderById200Response,
  IcreateUserDTO,
  IcreateUser200Response,
  IcreateUsersWithListInputDTO,
  IcreateUsersWithListInput200Response,
  IloginUserQuery,
  IloginUser200Response,
  IgetUserByName200Response,
  IupdateUserDTO,
} from '../types';

/**
 * Update an existing pet.
 * @method PUT
 * @path /pet
 * @tags pet
 */
export function useUpdatePet(
  options?: Omit<UseMutationOptions<IupdatePet200Response, Error, {
    data: IupdatePetDTO;
  }>, 'mutationFn'>
) {
  return useMutation({
    mutationFn: (variables: {
    data: IupdatePetDTO;
  }) => {
      return apiClient.updatePet(variables);
    },
    ...options,
  });
}

/**
 * Add a new pet to the store.
 * @method POST
 * @path /pet
 * @tags pet
 */
export function useAddPet(
  options?: Omit<UseMutationOptions<IaddPet200Response, Error, {
    data: IaddPetDTO;
  }>, 'mutationFn'>
) {
  return useMutation({
    mutationFn: (variables: {
    data: IaddPetDTO;
  }) => {
      return apiClient.addPet(variables);
    },
    ...options,
  });
}

/**
 * Finds Pets by status.
 * @method GET
 * @path /pet/findByStatus
 * @tags pet
 */
export function useFindPetsByStatus(
  params: {
    query: IfindPetsByStatusQuery;
  },
  options?: Omit<UseQueryOptions<IfindPetsByStatus200Response>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: ['findPetsByStatus', params],
    queryFn: () => apiClient.findPetsByStatus(params),
    ...options,
  });
}

/**
 * Finds Pets by tags.
 * @method GET
 * @path /pet/findByTags
 * @tags pet
 */
export function useFindPetsByTags(
  params: {
    query: IfindPetsByTagsQuery;
  },
  options?: Omit<UseQueryOptions<IfindPetsByTags200Response>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: ['findPetsByTags', params],
    queryFn: () => apiClient.findPetsByTags(params),
    ...options,
  });
}

/**
 * Find pet by ID.
 * @method GET
 * @path /pet/{petId}
 * @tags pet
 */
export function useGetPetById(
  params: {
    url: {
      petId: number;
    };
  },
  options?: Omit<UseQueryOptions<IgetPetById200Response>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: ['getPetById', params],
    queryFn: () => apiClient.getPetById(params),
    ...options,
  });
}

/**
 * Updates a pet in the store with form data.
 * @method POST
 * @path /pet/{petId}
 * @tags pet
 */
export function useUpdatePetWithForm(
  options?: Omit<UseMutationOptions<IupdatePetWithForm200Response, Error, {
    url: {
      petId: number;
    };
    query: IupdatePetWithFormQuery;
  }>, 'mutationFn'>
) {
  return useMutation({
    mutationFn: (variables: {
    url: {
      petId: number;
    };
    query: IupdatePetWithFormQuery;
  }) => {
      return apiClient.updatePetWithForm(variables);
    },
    ...options,
  });
}

/**
 * Deletes a pet.
 * @method DELETE
 * @path /pet/{petId}
 * @tags pet
 */
export function useDeletePet(
  options?: Omit<UseMutationOptions<any, Error, {
    url: {
      petId: number;
    };
  }>, 'mutationFn'>
) {
  return useMutation({
    mutationFn: (variables: {
    url: {
      petId: number;
    };
  }) => {
      return apiClient.deletePet(variables);
    },
    ...options,
  });
}

/**
 * Uploads an image.
 * @method POST
 * @path /pet/{petId}/uploadImage
 * @tags pet
 */
export function useUploadFile(
  options?: Omit<UseMutationOptions<IuploadFile200Response, Error, {
    url: {
      petId: number;
    };
    query: IuploadFileQuery;
    data: IuploadFileDTO;
  }>, 'mutationFn'>
) {
  return useMutation({
    mutationFn: (variables: {
    url: {
      petId: number;
    };
    query: IuploadFileQuery;
    data: IuploadFileDTO;
  }) => {
      return apiClient.uploadFile(variables);
    },
    ...options,
  });
}

/**
 * Returns pet inventories by status.
 * @method GET
 * @path /store/inventory
 * @tags store
 */
export function useGetInventory(
  options?: Omit<UseQueryOptions<IgetInventory200Response>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: ['getInventory'],
    queryFn: () => apiClient.getInventory(),
    ...options,
  });
}

/**
 * Place an order for a pet.
 * @method POST
 * @path /store/order
 * @tags store
 */
export function usePlaceOrder(
  options?: Omit<UseMutationOptions<IplaceOrder200Response, Error, {
    data: IplaceOrderDTO;
  }>, 'mutationFn'>
) {
  return useMutation({
    mutationFn: (variables: {
    data: IplaceOrderDTO;
  }) => {
      return apiClient.placeOrder(variables);
    },
    ...options,
  });
}

/**
 * Find purchase order by ID.
 * @method GET
 * @path /store/order/{orderId}
 * @tags store
 */
export function useGetOrderById(
  params: {
    url: {
      orderId: number;
    };
  },
  options?: Omit<UseQueryOptions<IgetOrderById200Response>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: ['getOrderById', params],
    queryFn: () => apiClient.getOrderById(params),
    ...options,
  });
}

/**
 * Delete purchase order by identifier.
 * @method DELETE
 * @path /store/order/{orderId}
 * @tags store
 */
export function useDeleteOrder(
  options?: Omit<UseMutationOptions<any, Error, {
    url: {
      orderId: number;
    };
  }>, 'mutationFn'>
) {
  return useMutation({
    mutationFn: (variables: {
    url: {
      orderId: number;
    };
  }) => {
      return apiClient.deleteOrder(variables);
    },
    ...options,
  });
}

/**
 * Create user.
 * @method POST
 * @path /user
 * @tags user
 */
export function useCreateUser(
  options?: Omit<UseMutationOptions<IcreateUser200Response, Error, {
    data: IcreateUserDTO;
  }>, 'mutationFn'>
) {
  return useMutation({
    mutationFn: (variables: {
    data: IcreateUserDTO;
  }) => {
      return apiClient.createUser(variables);
    },
    ...options,
  });
}

/**
 * Creates list of users with given input array.
 * @method POST
 * @path /user/createWithList
 * @tags user
 */
export function useCreateUsersWithListInput(
  options?: Omit<UseMutationOptions<IcreateUsersWithListInput200Response, Error, {
    data: IcreateUsersWithListInputDTO;
  }>, 'mutationFn'>
) {
  return useMutation({
    mutationFn: (variables: {
    data: IcreateUsersWithListInputDTO;
  }) => {
      return apiClient.createUsersWithListInput(variables);
    },
    ...options,
  });
}

/**
 * Logs user into the system.
 * @method GET
 * @path /user/login
 * @tags user
 */
export function useLoginUser(
  params: {
    query: IloginUserQuery;
  },
  options?: Omit<UseQueryOptions<IloginUser200Response>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: ['loginUser', params],
    queryFn: () => apiClient.loginUser(params),
    ...options,
  });
}

/**
 * Logs out current logged in user session.
 * @method GET
 * @path /user/logout
 * @tags user
 */
export function useLogoutUser(
  options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: ['logoutUser'],
    queryFn: () => apiClient.logoutUser(),
    ...options,
  });
}

/**
 * Get user by user name.
 * @method GET
 * @path /user/{username}
 * @tags user
 */
export function useGetUserByName(
  params: {
    url: {
      username: string;
    };
  },
  options?: Omit<UseQueryOptions<IgetUserByName200Response>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: ['getUserByName', params],
    queryFn: () => apiClient.getUserByName(params),
    ...options,
  });
}

/**
 * Update user resource.
 * @method PUT
 * @path /user/{username}
 * @tags user
 */
export function useUpdateUser(
  options?: Omit<UseMutationOptions<any, Error, {
    url: {
      username: string;
    };
    data: IupdateUserDTO;
  }>, 'mutationFn'>
) {
  return useMutation({
    mutationFn: (variables: {
    url: {
      username: string;
    };
    data: IupdateUserDTO;
  }) => {
      return apiClient.updateUser(variables);
    },
    ...options,
  });
}

/**
 * Delete user resource.
 * @method DELETE
 * @path /user/{username}
 * @tags user
 */
export function useDeleteUser(
  options?: Omit<UseMutationOptions<any, Error, {
    url: {
      username: string;
    };
  }>, 'mutationFn'>
) {
  return useMutation({
    mutationFn: (variables: {
    url: {
      username: string;
    };
  }) => {
      return apiClient.deleteUser(variables);
    },
    ...options,
  });
}



// ============================================================
// 🔒 CUSTOM CODE START
// Add your custom code above this line
// This section will be preserved during regeneration
// ============================================================

// 🔒 CUSTOM CODE END
// ============================================================