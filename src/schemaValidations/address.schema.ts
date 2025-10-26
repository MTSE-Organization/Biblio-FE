import z from 'zod';

export const addressSchema = z.object({
  id: z.string().optional(),
  detail: z.string().nonempty('Bắt buộc'),
  city: z.string().nonempty('Bắt buộc'),
  district: z.string(),
  ward: z.string().nonempty('Bắt buộc'),
  hamlet: z.string().nonempty('Bắt buộc'),
  longitude: z.number(),
  latitude: z.number(),
  isDefault: z.boolean(),
  receiverName: z.string().nonempty('Bắt buộc'),
  phoneNumber: z
    .string({ error: 'Số điện thoại không được để trống' })
    .trim()
    .regex(/^\d{10}$/, 'Số điện thoại không hợp lệ')
});
