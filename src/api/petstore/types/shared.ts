export type IOrder = {
	"id"?: number;
	"petId"?: number;
	"quantity"?: number;
	"shipDate"?: string;
/**
 *  Order Status
 */
	"status"?: ("placed"|"approved"|"delivered");
	"complete"?: boolean;
};

export type ICategory = {
	"id"?: number;
	"name"?: string;
};

export type IUser = {
	"id"?: number;
	"username"?: string;
	"firstName"?: string;
	"lastName"?: string;
	"email"?: string;
	"password"?: string;
	"phone"?: string;
/**
 *  User Status
 */
	"userStatus"?: number;
};

export type ITag = {
	"id"?: number;
	"name"?: string;
};

export type IPet = {
	"id"?: number;
	"name": string;
	"category"?: ICategory;
	"photoUrls": string[];
	"tags"?: ITag[];
/**
 *  pet status in the store
 */
	"status"?: ("available"|"pending"|"sold");
};

export type IApiResponse = {
	"code"?: number;
	"type"?: string;
	"message"?: string;
};

/**
 *  List of user object
 */
export type IUserArray = any;


// ============================================================
// 🔒 CUSTOM CODE START
// Add your custom code above this line
// This section will be preserved during regeneration
// ============================================================

// 🔒 CUSTOM CODE END
// ============================================================