// Generated Axios API Client
// This file was auto-generated. Add custom code in the marked sections.

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

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

import {
  updatePet,
  addPet,
  findPetsByStatus,
  findPetsByTags,
  getPetById,
  updatePetWithForm,
  deletePet,
  uploadFile,
  getInventory,
  placeOrder,
  getOrderById,
  deleteOrder,
  createUser,
  createUsersWithListInput,
  loginUser,
  logoutUser,
  getUserByName,
  updateUser,
  deleteUser,
} from '../endpoints';

export interface ApiConfig {
  baseURL?: string;
  headers?: Record<string, string>;
  timeout?: number;
}

class ApiClient {
  private client: AxiosInstance;

  constructor(config: ApiConfig = {}) {
    this.client = axios.create({
      baseURL: config.baseURL || "",
      timeout: config.timeout || 30000,
      headers: {
        'Content-Type': 'application/json',
        ...config.headers,
      },
    });

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  updateConfig(config: Partial<ApiConfig>) {
    Object.assign(this.client.defaults, config);
  }

  /**
   * Update an existing pet.
   * @method PUT
   * @path /pet
   * @tags pet
   */
  async updatePet(params: {
    data: IupdatePetDTO;
  }): Promise<IupdatePet200Response> {
    const { data } = params;
    const _url = updatePet;
    const config: AxiosRequestConfig = {};
    const response = await this.client.put<IupdatePet200Response>(
      _url,
      data,
      config
    );
    return response.data;
  }

  /**
   * Add a new pet to the store.
   * @method POST
   * @path /pet
   * @tags pet
   */
  async addPet(params: {
    data: IaddPetDTO;
  }): Promise<IaddPet200Response> {
    const { data } = params;
    const _url = addPet;
    const config: AxiosRequestConfig = {};
    const response = await this.client.post<IaddPet200Response>(
      _url,
      data,
      config
    );
    return response.data;
  }

  /**
   * Finds Pets by status.
   * @method GET
   * @path /pet/findByStatus
   * @tags pet
   */
  async findPetsByStatus(params: {
    query: IfindPetsByStatusQuery;
  }): Promise<IfindPetsByStatus200Response> {
    const { query } = params;
    const _url = findPetsByStatus;
    const config: AxiosRequestConfig = {};
    config.params = { ...query };
    const response = await this.client.get<IfindPetsByStatus200Response>(
      _url,
      config
    );
    return response.data;
  }

  /**
   * Finds Pets by tags.
   * @method GET
   * @path /pet/findByTags
   * @tags pet
   */
  async findPetsByTags(params: {
    query: IfindPetsByTagsQuery;
  }): Promise<IfindPetsByTags200Response> {
    const { query } = params;
    const _url = findPetsByTags;
    const config: AxiosRequestConfig = {};
    config.params = { ...query };
    const response = await this.client.get<IfindPetsByTags200Response>(
      _url,
      config
    );
    return response.data;
  }

  /**
   * Find pet by ID.
   * @method GET
   * @path /pet/{petId}
   * @tags pet
   */
  async getPetById(params: {
    url: {
      petId: number;
    };
  }): Promise<IgetPetById200Response> {
    const { url } = params;
    const _url = getPetById(url.petId);
    const config: AxiosRequestConfig = {};
    const response = await this.client.get<IgetPetById200Response>(
      _url,
      config
    );
    return response.data;
  }

  /**
   * Updates a pet in the store with form data.
   * @method POST
   * @path /pet/{petId}
   * @tags pet
   */
  async updatePetWithForm(params: {
    url: {
      petId: number;
    };
    query: IupdatePetWithFormQuery;
  }): Promise<IupdatePetWithForm200Response> {
    const { url, query } = params;
    const _url = updatePetWithForm(url.petId);
    const config: AxiosRequestConfig = {};
    config.params = { ...query };
    const response = await this.client.post<IupdatePetWithForm200Response>(
      _url,
      undefined,
      config
    );
    return response.data;
  }

  /**
   * Deletes a pet.
   * @method DELETE
   * @path /pet/{petId}
   * @tags pet
   */
  async deletePet(params: {
    url: {
      petId: number;
    };
  }): Promise<any> {
    const { url } = params;
    const _url = deletePet(url.petId);
    const config: AxiosRequestConfig = {};
    const response = await this.client.delete<any>(
      _url,
      config
    );
    return response.data;
  }

  /**
   * Uploads an image.
   * @method POST
   * @path /pet/{petId}/uploadImage
   * @tags pet
   */
  async uploadFile(params: {
    url: {
      petId: number;
    };
    query: IuploadFileQuery;
    data: IuploadFileDTO;
  }): Promise<IuploadFile200Response> {
    const { url, query, data } = params;
    const _url = uploadFile(url.petId);
    const config: AxiosRequestConfig = {};
    config.params = { ...query };
    const response = await this.client.post<IuploadFile200Response>(
      _url,
      data,
      config
    );
    return response.data;
  }

  /**
   * Returns pet inventories by status.
   * @method GET
   * @path /store/inventory
   * @tags store
   */
  async getInventory(): Promise<IgetInventory200Response> {
    const _url = getInventory;
    const config: AxiosRequestConfig = {};
    const response = await this.client.get<IgetInventory200Response>(
      _url,
      config
    );
    return response.data;
  }

  /**
   * Place an order for a pet.
   * @method POST
   * @path /store/order
   * @tags store
   */
  async placeOrder(params: {
    data: IplaceOrderDTO;
  }): Promise<IplaceOrder200Response> {
    const { data } = params;
    const _url = placeOrder;
    const config: AxiosRequestConfig = {};
    const response = await this.client.post<IplaceOrder200Response>(
      _url,
      data,
      config
    );
    return response.data;
  }

  /**
   * Find purchase order by ID.
   * @method GET
   * @path /store/order/{orderId}
   * @tags store
   */
  async getOrderById(params: {
    url: {
      orderId: number;
    };
  }): Promise<IgetOrderById200Response> {
    const { url } = params;
    const _url = getOrderById(url.orderId);
    const config: AxiosRequestConfig = {};
    const response = await this.client.get<IgetOrderById200Response>(
      _url,
      config
    );
    return response.data;
  }

  /**
   * Delete purchase order by identifier.
   * @method DELETE
   * @path /store/order/{orderId}
   * @tags store
   */
  async deleteOrder(params: {
    url: {
      orderId: number;
    };
  }): Promise<any> {
    const { url } = params;
    const _url = deleteOrder(url.orderId);
    const config: AxiosRequestConfig = {};
    const response = await this.client.delete<any>(
      _url,
      config
    );
    return response.data;
  }

  /**
   * Create user.
   * @method POST
   * @path /user
   * @tags user
   */
  async createUser(params: {
    data: IcreateUserDTO;
  }): Promise<IcreateUser200Response> {
    const { data } = params;
    const _url = createUser;
    const config: AxiosRequestConfig = {};
    const response = await this.client.post<IcreateUser200Response>(
      _url,
      data,
      config
    );
    return response.data;
  }

  /**
   * Creates list of users with given input array.
   * @method POST
   * @path /user/createWithList
   * @tags user
   */
  async createUsersWithListInput(params: {
    data: IcreateUsersWithListInputDTO;
  }): Promise<IcreateUsersWithListInput200Response> {
    const { data } = params;
    const _url = createUsersWithListInput;
    const config: AxiosRequestConfig = {};
    const response = await this.client.post<IcreateUsersWithListInput200Response>(
      _url,
      data,
      config
    );
    return response.data;
  }

  /**
   * Logs user into the system.
   * @method GET
   * @path /user/login
   * @tags user
   */
  async loginUser(params: {
    query: IloginUserQuery;
  }): Promise<IloginUser200Response> {
    const { query } = params;
    const _url = loginUser;
    const config: AxiosRequestConfig = {};
    config.params = { ...query };
    const response = await this.client.get<IloginUser200Response>(
      _url,
      config
    );
    return response.data;
  }

  /**
   * Logs out current logged in user session.
   * @method GET
   * @path /user/logout
   * @tags user
   */
  async logoutUser(): Promise<any> {
    const _url = logoutUser;
    const config: AxiosRequestConfig = {};
    const response = await this.client.get<any>(
      _url,
      config
    );
    return response.data;
  }

  /**
   * Get user by user name.
   * @method GET
   * @path /user/{username}
   * @tags user
   */
  async getUserByName(params: {
    url: {
      username: string;
    };
  }): Promise<IgetUserByName200Response> {
    const { url } = params;
    const _url = getUserByName(url.username);
    const config: AxiosRequestConfig = {};
    const response = await this.client.get<IgetUserByName200Response>(
      _url,
      config
    );
    return response.data;
  }

  /**
   * Update user resource.
   * @method PUT
   * @path /user/{username}
   * @tags user
   */
  async updateUser(params: {
    url: {
      username: string;
    };
    data: IupdateUserDTO;
  }): Promise<any> {
    const { url, data } = params;
    const _url = updateUser(url.username);
    const config: AxiosRequestConfig = {};
    const response = await this.client.put<any>(
      _url,
      data,
      config
    );
    return response.data;
  }

  /**
   * Delete user resource.
   * @method DELETE
   * @path /user/{username}
   * @tags user
   */
  async deleteUser(params: {
    url: {
      username: string;
    };
  }): Promise<any> {
    const { url } = params;
    const _url = deleteUser(url.username);
    const config: AxiosRequestConfig = {};
    const response = await this.client.delete<any>(
      _url,
      config
    );
    return response.data;
  }

}

export const apiClient = new ApiClient();
export default apiClient;


// ============================================================
// 🔒 CUSTOM CODE START
// Add your custom code above this line
// This section will be preserved during regeneration
// ============================================================

// 🔒 CUSTOM CODE END
// ============================================================