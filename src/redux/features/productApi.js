import { apiSlice } from "../api/apiSlice";

const BASE_URL = 'https://aaharr.com';

export const productApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => `https://shofy-backend.vercel.app/api/product/all`,
      providesTags:['Products']
    }),
    getAllProductsByZipCode: builder.query({
      query: (zipcode) => `${BASE_URL}/api/home?zipcode=${zipcode}`,
      providesTags: ['ProductsByZipcode'],
    }),
    getProductType: builder.query({
      query: ({ type, query }) => `https://shofy-backend.vercel.app/api/product/${type}?${query}`,
      providesTags:['ProductType']
    }),
    getOfferProducts: builder.query({
      query: (type) => `https://shofy-backend.vercel.app/api/product/offer?type=${type}`,
      providesTags:['OfferProducts']
    }),
    getPopularProductByType: builder.query({
      query: (type) => `https://shofy-backend.vercel.app/api/product/popular/${type}`,
      providesTags:['PopularProducts']
    }),
    getTopRatedProducts: builder.query({
      query: () => `https://shofy-backend.vercel.app/api/product/top-rated`,
      providesTags:['TopRatedProducts']
    }),
    // get single product
    getProduct: builder.query({
      query: (id) => `https://shofy-backend.vercel.app/api/product/single-product/${id}`,
      providesTags: (result, error, arg) => [{ type: "Product", id: arg }],
      invalidatesTags: (result, error, arg) => [
        { type: "RelatedProducts", id:arg },
      ],
    }),
    // get related products
    getRelatedProducts: builder.query({
      query: (id) => `https://shofy-backend.vercel.app/api/product/related-product/${id}`,
      providesTags: (result, error, arg) => [
        { type: "RelatedProducts", id: arg },
      ],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductTypeQuery,
  useGetOfferProductsQuery,
  useGetPopularProductByTypeQuery,
  useGetTopRatedProductsQuery,
  useGetProductQuery,
  useGetRelatedProductsQuery,
  useGetAllProductsByZipCodeQuery
} = productApi;
