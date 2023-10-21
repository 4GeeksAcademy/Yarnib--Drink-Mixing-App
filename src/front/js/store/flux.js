import { useNavigate } from "react-router-dom";

const baseApiUrl = process.env.BACKEND_URL || "http://127.0.0.1:3001";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			accessToken: undefined,
			user: undefined
		},
		actions: {
			logIn: async ({email, hashed_password}) => {
				const response = await fetch(
					`${baseApiUrl}/api/log-in`, {
						method: "POST",
						body: JSON.stringify({
							email: email,
							hashed_password: hashed_password,
						}),
						headers: {
							"Content-Type": "application/json"
						}
					}
				)
				const body = await response.json();
				if (response.ok) {
					setStore({
						accessToken: body.access_token,
						user: body.user
					});
					localStorage.setItem("accessToken", body.access_token);
					localStorage.setItem("user", body.user);
					return true
				}
			}
			
			,
			logOut: () => {
				setStore({
					accessToken: undefined,
					user: undefined,
				});
			
				localStorage.removeItem("accessToken");
				localStorage.removeItem("user");

			},
			signUp: async ({ email, hashed_password, name }) => {
				const response = await fetch(`${baseApiUrl}/api/sign-up`, {
				  method: "POST",
				  body: JSON.stringify({
					email: email,
					hashed_password: hashed_password,
					name: name
				  }),
				  headers: {
					"Content-Type": "application/json",
				  },
				});
			  
				const body = await response.json();
				if (response.ok) {
				  setStore({
					accessToken: body.access_token,
					user: body.user,
				  });
			  
				  localStorage.setItem("accessToken", body.access_token);
				  localStorage.setItem("user", JSON.stringify(body.user));
				}
			  }

			
			,
			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;