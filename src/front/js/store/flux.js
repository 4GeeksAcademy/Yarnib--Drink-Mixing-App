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
			user: undefined,
			contact_requests: [],
			favorites: [],
		},


		actions: {
			contact: async ({ name, email, datatype, text }) => {

				const response = await fetch(`${baseApiUrl}/api/contact_requests`, {
					method: "POST",
					body: JSON.stringify({
						name: name,
						email: email,
						datatype: datatype,
						text: text,
					}),
					headers: {
						"Content-Type": "application/json"
					}
				});

				if (response.ok) {
					const body = await response.json();
					console.log("Contact request submitted successfully:", body);
				} else {
					throw new Error('Failed to submit contact request');
				}
			}
			,



			logIn: async ({ email, hashed_password }) => {
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
			signUp: async ({ email, hashed_password, name, age }) => {
				const response = await fetch(`${baseApiUrl}/api/sign-up`, {
					method: "POST",
					body: JSON.stringify({
						email: email,
						hashed_password: hashed_password,
						name: name,
						age: age
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
			},



			loadSomeData: () => {
				fetch("www.thecocktaildb.com/api/json/v1/1/search.php?f=a")
					.then((response) => response.json())
					.then((data) => {
						// always console log first
						console.log(data)
						setStore({ cocktails: data.results })
					})
			},

			addToFavorites: async (userId, cocktailId, name, url) => {
				console.log("api call: addToFavorites")
				const response = await fetch(`${baseApiUrl}/api/favorites`, {
					method: "POST",
					body: JSON.stringify({
						userId: userId,
						cocktailId: cocktailId,
						name: name,
						url: url
					},
					),
					headers: {
						"Content-Type": "application/json",
					}
				}).then(response => {
					if (response.status == 201) {
						console.log("succesfully added to favorites")
					} else {
						console.log("Error when adding")
					}
				})

			},
			getAllFavorites: async (userId) => {
				const response = await fetch(`${baseApiUrl}/api/favorites/all`, {
					method: "POST",
					body: JSON.stringify({
						userId: userId
					},
					),
					headers: {
						"Content-Type": "application/json",
					}
				}).then(response => {
					return response.json()
				}).then(data => {
					console.log(data)
					setStore({
						user: getStore().user,
						accessToken: getStore().accessToken,
						cocktails: getStore().cocktails,
						favorites: data.favs
					})
					return data
				})
				return response
			},

			deleteFavorites: async (favId,) => {
				console.log("api call: DeleteFromFavorite")
				const response = await fetch(`${baseApiUrl}/api/favorites`, {
					method: "DELETE",
					body: JSON.stringify({
						favId: favId
					},
					),
					headers: {
						"Content-Type": "application/json",
					}
				}).then(response => {
					if (response.status == 201) {
						console.log("succesfully added to favorites")
					} else {
						console.log("Error when adding")
					}
				})
			},


			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
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