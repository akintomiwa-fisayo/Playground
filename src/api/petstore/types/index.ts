import * as Shared from "./shared";

export type IupdatePetDTO = Shared.IPet;
export type IupdatePet200Response = Shared.IPet;
export type IaddPetDTO = Shared.IPet;
export type IaddPet200Response = Shared.IPet;
export type IfindPetsByStatusQuery = {
	"status": ("available"|"pending"|"sold");
};
export type IfindPetsByStatus200Response = Shared.IPet[];
export type IfindPetsByTagsQuery = {
	"tags": string[];
};
export type IfindPetsByTags200Response = Shared.IPet[];
export type IgetPetById200Response = Shared.IPet;
export type IupdatePetWithFormQuery = {
	"name"?: string;
	"status"?: string;
};
export type IupdatePetWithForm200Response = Shared.IPet;
export type IuploadFileQuery = {
	"additionalMetadata"?: string;
};
export type IuploadFileDTO = string;
export type IuploadFile200Response = Shared.IApiResponse;
export type IgetInventory200Response = {[k: string]: number};
export type IplaceOrderDTO = Shared.IOrder;
export type IplaceOrder200Response = Shared.IOrder;
export type IgetOrderById200Response = Shared.IOrder;
export type IcreateUserDTO = Shared.IUser;
export type IcreateUser200Response = Shared.IUser;
export type IcreateUsersWithListInputDTO = Shared.IUser[];
export type IcreateUsersWithListInput200Response = Shared.IUser;
export type IloginUserQuery = {
	"username"?: string;
	"password"?: string;
};
export type IloginUser200Response = string;
export type IgetUserByName200Response = Shared.IUser;
export type IupdateUserDTO = Shared.IUser;


// ============================================================
// 🔒 CUSTOM CODE START
// Add your custom code above this line
// This section will be preserved during regeneration
// ============================================================

// 🔒 CUSTOM CODE END
// ============================================================