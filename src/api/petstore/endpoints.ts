/**
* Update an existing pet by Id.  
 * **Method**: `PUT`  
 * **Summary**: Update an existing pet.  
 * **Tags**: [pet]  
 * **OperationId**: updatePet  
 * **DTO**: 
```typescript
    Shared.IPet
```  
 * **Security**:  
    - **petstore_auth**: [write:pets, read:pets]  

 */
export const updatePet = "https://petstore3.swagger.io/api/v3/pet";
/**
* Add a new pet to the store.  
 * **Method**: `POST`  
 * **Summary**: Add a new pet to the store.  
 * **Tags**: [pet]  
 * **OperationId**: addPet  
 * **DTO**: 
```typescript
    Shared.IPet
```  
 * **Security**:  
    - **petstore_auth**: [write:pets, read:pets]  

 */
export const addPet = "https://petstore3.swagger.io/api/v3/pet";
/**
* Multiple status values can be provided with comma separated strings.  
 * **Method**: `GET`  
 * **Summary**: Finds Pets by status.  
 * **Tags**: [pet]  
 * **OperationId**: findPetsByStatus  
 * **Query**: 
```typescript
    {
    	"status": ("available"|"pending"|"sold");
    }
```  
 * **Security**:  
    - **petstore_auth**: [write:pets, read:pets]  

 */
export const findPetsByStatus = "https://petstore3.swagger.io/api/v3/pet/findByStatus";
/**
* Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.  
 * **Method**: `GET`  
 * **Summary**: Finds Pets by tags.  
 * **Tags**: [pet]  
 * **OperationId**: findPetsByTags  
 * **Query**: 
```typescript
    {
    	"tags": string[];
    }
```  
 * **Security**:  
    - **petstore_auth**: [write:pets, read:pets]  

 */
export const findPetsByTags = "https://petstore3.swagger.io/api/v3/pet/findByTags";
/**
* Returns a single pet.  
 * **Method**: `GET`  
 * **Summary**: Find pet by ID.  
 * **Tags**: [pet]  
 * **OperationId**: getPetById  
 * **Path**: 
```typescript
    {
    	"petId": number;
    }
```  
 * **Security**:  
    - **api_key**  

    - **petstore_auth**: [write:pets, read:pets]  

 */
export const getPetById = (petId:number)=> `https://petstore3.swagger.io/api/v3/pet/${petId}`;
/**
* Updates a pet resource based on the form data.  
 * **Method**: `POST`  
 * **Summary**: Updates a pet in the store with form data.  
 * **Tags**: [pet]  
 * **OperationId**: updatePetWithForm  
 * **Path**: 
```typescript
    {
    	"petId": number;
    }
```  
 * **Query**: 
```typescript
    {
    	"name"?: string;
    	"status"?: string;
    }
```  
 * **Security**:  
    - **petstore_auth**: [write:pets, read:pets]  

 */
export const updatePetWithForm = (petId:number)=> `https://petstore3.swagger.io/api/v3/pet/${petId}`;
/**
* Delete a pet.  
 * **Method**: `DELETE`  
 * **Summary**: Deletes a pet.  
 * **Tags**: [pet]  
 * **OperationId**: deletePet  
 * **Path**: 
```typescript
    {
    	"petId": number;
    }
```  
 * **Security**:  
    - **petstore_auth**: [write:pets, read:pets]  

 */
export const deletePet = (petId:number)=> `https://petstore3.swagger.io/api/v3/pet/${petId}`;
/**
* Upload image of the pet.  
 * **Method**: `POST`  
 * **Summary**: Uploads an image.  
 * **Tags**: [pet]  
 * **OperationId**: uploadFile  
 * **Path**: 
```typescript
    {
    	"petId": number;
    }
```  
 * **Query**: 
```typescript
    {
    	"additionalMetadata"?: string;
    }
```  
 * **DTO**: 
```typescript
    string
```  
 * **Security**:  
    - **petstore_auth**: [write:pets, read:pets]  

 */
export const uploadFile = (petId:number)=> `https://petstore3.swagger.io/api/v3/pet/${petId}/uploadImage`;
/**
* Returns a map of status codes to quantities.  
 * **Method**: `GET`  
 * **Summary**: Returns pet inventories by status.  
 * **Tags**: [store]  
 * **OperationId**: getInventory  
 * **Security**:  
    - **api_key**  

 */
export const getInventory = "https://petstore3.swagger.io/api/v3/store/inventory";
/**
* Place a new order in the store.  
 * **Method**: `POST`  
 * **Summary**: Place an order for a pet.  
 * **Tags**: [store]  
 * **OperationId**: placeOrder  
 * **DTO**: 
```typescript
    Shared.IOrder
```  
 */
export const placeOrder = "https://petstore3.swagger.io/api/v3/store/order";
/**
* For valid response try integer IDs with value <= 5 or > 10. Other values will generate exceptions.  
 * **Method**: `GET`  
 * **Summary**: Find purchase order by ID.  
 * **Tags**: [store]  
 * **OperationId**: getOrderById  
 * **Path**: 
```typescript
    {
    	"orderId": number;
    }
```  
 */
export const getOrderById = (orderId:number)=> `https://petstore3.swagger.io/api/v3/store/order/${orderId}`;
/**
* For valid response try integer IDs with value < 1000. Anything above 1000 or non-integers will generate API errors.  
 * **Method**: `DELETE`  
 * **Summary**: Delete purchase order by identifier.  
 * **Tags**: [store]  
 * **OperationId**: deleteOrder  
 * **Path**: 
```typescript
    {
    	"orderId": number;
    }
```  
 */
export const deleteOrder = (orderId:number)=> `https://petstore3.swagger.io/api/v3/store/order/${orderId}`;
/**
* This can only be done by the logged in user.  
 * **Method**: `POST`  
 * **Summary**: Create user.  
 * **Tags**: [user]  
 * **OperationId**: createUser  
 * **DTO**: 
```typescript
    Shared.IUser
```  
 */
export const createUser = "https://petstore3.swagger.io/api/v3/user";
/**
* Creates list of users with given input array.  
 * **Method**: `POST`  
 * **Summary**: Creates list of users with given input array.  
 * **Tags**: [user]  
 * **OperationId**: createUsersWithListInput  
 * **DTO**: 
```typescript
    Shared.IUser[]
```  
 */
export const createUsersWithListInput = "https://petstore3.swagger.io/api/v3/user/createWithList";
/**
* Log into the system.  
 * **Method**: `GET`  
 * **Summary**: Logs user into the system.  
 * **Tags**: [user]  
 * **OperationId**: loginUser  
 * **Query**: 
```typescript
    {
    	"username"?: string;
    	"password"?: string;
    }
```  
 */
export const loginUser = "https://petstore3.swagger.io/api/v3/user/login";
/**
* Log user out of the system.  
 * **Method**: `GET`  
 * **Summary**: Logs out current logged in user session.  
 * **Tags**: [user]  
 * **OperationId**: logoutUser  
 */
export const logoutUser = "https://petstore3.swagger.io/api/v3/user/logout";
/**
* Get user detail based on username.  
 * **Method**: `GET`  
 * **Summary**: Get user by user name.  
 * **Tags**: [user]  
 * **OperationId**: getUserByName  
 * **Path**: 
```typescript
    {
    	"username": string;
    }
```  
 */
export const getUserByName = (username:string)=> `https://petstore3.swagger.io/api/v3/user/${username}`;
/**
* This can only be done by the logged in user.  
 * **Method**: `PUT`  
 * **Summary**: Update user resource.  
 * **Tags**: [user]  
 * **OperationId**: updateUser  
 * **Path**: 
```typescript
    {
    	"username": string;
    }
```  
 * **DTO**: 
```typescript
    Shared.IUser
```  
 */
export const updateUser = (username:string)=> `https://petstore3.swagger.io/api/v3/user/${username}`;
/**
* This can only be done by the logged in user.  
 * **Method**: `DELETE`  
 * **Summary**: Delete user resource.  
 * **Tags**: [user]  
 * **OperationId**: deleteUser  
 * **Path**: 
```typescript
    {
    	"username": string;
    }
```  
 */
export const deleteUser = (username:string)=> `https://petstore3.swagger.io/api/v3/user/${username}`;


// ============================================================
// 🔒 CUSTOM CODE START
// Add your custom code above this line
// This section will be preserved during regeneration
// ============================================================

// 🔒 CUSTOM CODE END
// ============================================================