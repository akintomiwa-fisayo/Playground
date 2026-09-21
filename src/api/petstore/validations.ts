import { z } from "zod";

export const IPutPetDTOSchema = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  category: z.object({
    id: z.number().int().optional(),
    name: z.string().optional()
  }).optional(),
  photoUrls: z.array(z.string()),
  tags: z.array(z.object({
      id: z.number().int().optional(),
      name: z.string().optional()
    })).optional(),
  status: z.enum(["available", "pending", "sold"]).optional()
});

export const IPostPetDTOSchema = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  category: z.object({
    id: z.number().int().optional(),
    name: z.string().optional()
  }).optional(),
  photoUrls: z.array(z.string()),
  tags: z.array(z.object({
      id: z.number().int().optional(),
      name: z.string().optional()
    })).optional(),
  status: z.enum(["available", "pending", "sold"]).optional()
});

export const IGetPetFindByStatusQuerySchema = z.object({
  status: z.enum(["available", "pending", "sold"])
});

export const IGetPetFindByTagsQuerySchema = z.object({
  tags: z.array(z.string())
});

export const IPostPet$petIdQuerySchema = z.object({
  name: z.string().optional(),
  status: z.string().optional()
});

export const IPostPet$petIdUploadImageQuerySchema = z.object({
  additionalMetadata: z.string().optional()
});

export const IPostPet$petIdUploadImageDTOSchema = z.string();

export const IPostStoreOrderDTOSchema = z.object({
  id: z.number().int().optional(),
  petId: z.number().int().optional(),
  quantity: z.number().int().optional(),
  shipDate: z.string().datetime().optional(),
  status: z.enum(["placed", "approved", "delivered"]).optional(),
  complete: z.boolean().optional()
});

export const IPostUserDTOSchema = z.object({
  id: z.number().int().optional(),
  username: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().optional(),
  password: z.string().optional(),
  phone: z.string().optional(),
  userStatus: z.number().int().optional()
});

export const IPostUserCreateWithListDTOSchema = z.array(z.object({
    id: z.number().int().optional(),
    username: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.string().optional(),
    password: z.string().optional(),
    phone: z.string().optional(),
    userStatus: z.number().int().optional()
  }));

export const IGetUserLoginQuerySchema = z.object({
  username: z.string().optional(),
  password: z.string().optional()
});

export const IPutUser$usernameDTOSchema = z.object({
  id: z.number().int().optional(),
  username: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().optional(),
  password: z.string().optional(),
  phone: z.string().optional(),
  userStatus: z.number().int().optional()
});



// ============================================================
// 🔒 CUSTOM CODE START
// Add your custom code above this line
// This section will be preserved during regeneration
// ============================================================

// 🔒 CUSTOM CODE END
// ============================================================