import { apiSlice } from "./apiSlice";
import { ORDERS_URL, PAYPAL_URL } from "../constants";

export const ordersApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		createOrder: builder.mutation({
			query: (order) => ({
				url: ORDERS_URL,
				method: "POST",
				body: { ...order }
			}),
			invalidatesTags: ["Order"]
		}),
		getOrderDetails: builder.query({
			query: (id) => ({
				url: `${ORDERS_URL}/${id}`
			}),
			keepUnusedDataFor: 5
		}),
		payOrder: builder.mutation({
			query: ({ orderId, details }) => ({
				url: `${ORDERS_URL}/${orderId}/pay`,
				method: "PUT",
				body: { ...details }
			})
		}),
		getPayPalClientId: builder.query({
			query: () => ({
				url: PAYPAL_URL
			}),
			keepUnusedDataFor: 5
		}),
		getMyOrders: builder.query({
			query: () => ({
				url: `${ORDERS_URL}/myorders`
			}),
			keepUnusedDataFor: 5,
			providesTags: ["Order"]
		}),
		getOrders: builder.query({
			query: () => ({
				url: ORDERS_URL
			}),
			keepUnusedDataFor: 5,
			providesTags: ["Orders"]
		}),
		deliverOrder: builder.mutation({
			query: (orderId) => ({
				url: `${ORDERS_URL}/${orderId}/deliver`,
				method: "PUT"
			})
		}),
		deleteOrder: builder.mutation({
			query: (orderId) => ({
				url: `${ORDERS_URL}/${orderId}`,
				method: "DELETE"
			}),
			invalidatesTags: ["Order"]
		})
	})
});

export const {
	useCreateOrderMutation,
	useGetOrderDetailsQuery,
	useGetPayPalClientIdQuery,
	usePayOrderMutation,
	useGetMyOrdersQuery,
	useGetOrdersQuery,
	useDeliverOrderMutation,
	useDeleteOrderMutation
} = ordersApiSlice;
