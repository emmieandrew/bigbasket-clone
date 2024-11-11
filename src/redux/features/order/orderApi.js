import { BASE_URL } from "@/utils/constants";
import { apiSlice } from "../../api/apiSlice";
import { set_client_secret } from "./orderSlice";

export const authApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // createPaymentIntent
    createPaymentIntent: builder.mutation({
      query: (data) => ({
        url: "https://shofy-backend.vercel.app/api/order/create-payment-intent",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(set_client_secret(result.clientSecret));
        } catch (err) {
          // handle error
        }
      },
    }),

    // saveOrder
    saveOrder: builder.mutation({
      query: (data) => ({
        url: "https://shofy-backend.vercel.app/api/order/saveOrder",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['UserOrders'],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result) {
            localStorage.removeItem("couponInfo");
            localStorage.removeItem("cart_products");
            localStorage.removeItem("shipping_info");
          }
        } catch (err) {
          // handle error
        }
      },
    }),

    // syncCarts
    syncCarts: builder.mutation({
      query: (cart_products) => {
        // Map the cart_products data to the required format
        const data = cart_products.map((cart) => ({
          variant_id: cart.selectedVariant.id,
          qty: cart.orderQuantity,
          product_id: cart.id,
        }));

        return {
          url: `${BASE_URL}/api/sync_cart`,
          method: "POST",
          body: data,
        };
      },
      providesTags: (result, error, arg) => [{ type: "SyncCart", id: arg }],
    }),

    // getUserOrders
    getUserOrders: builder.query({
      query: () => `https://shofy-backend.vercel.app/api/user-order`,
      providesTags: ["UserOrders"],
      keepUnusedDataFor: 600,
    }),

    // getUserOrderById
    getUserOrderById: builder.query({
      query: (id) => `https://shofy-backend.vercel.app/api/user-order/${id}`,
      providesTags: (result, error, arg) => [{ type: "UserOrder", id: arg }],
      keepUnusedDataFor: 600,
    }),
  }),
});

export const {
  useCreatePaymentIntentMutation,
  useSaveOrderMutation,
  useGetUserOrderByIdQuery,
  useGetUserOrdersQuery,
  useSyncCartsMutation
} = authApi;
