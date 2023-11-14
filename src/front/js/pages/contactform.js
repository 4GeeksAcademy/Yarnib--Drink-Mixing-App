import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import '../../styles/home.css'
export const ContactForm = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [datatype, setDatatype] = useState("");
    const [text, setText] = useState("");
    const { actions } = useContext(Context);

    const onSubmit = async (event) => {
        event.preventDefault();

        const success = await actions.contact({
            name: name,
            email: email,
            datatype: datatype,
            text: text
        });

        if (success) {
            navigate('/');
        }
    };

    return (
        <div className="container">
            <form onSubmit={onSubmit}>
                <div className="row">
                    <h1>Contact</h1>
                </div>
                <div className="row">
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="row">
                    <input
                        type="text"
                        id="email"
                        className="form-control"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="row">
                    <h6>Is this about a new recipe or an error on our site?</h6>
                    <div className="form-check">
                        <input
                            type="radio"
                            id="flexRadioDefault1"
                            checked={datatype === 'website'}
                            onChange={() => setDatatype('website')}
                        />
                        <label htmlFor="flexRadioDefault1">
                            I have an issue with the website
                        </label>
                    </div>
                    <div className="form-check">
                        <input
                            type="radio"
                            id="flexRadioDefault2"
                            checked={datatype === 'recipe'}
                            onChange={() => setDatatype('recipe')}
                        />
                        <label htmlFor="flexRadioDefault2">
                            I have a new recipe!
                        </label>
                    </div>
                </div>
                <div className="row">
                    <h6>Write us below!</h6>
                    <textarea
                        type="text"
                        id="text"
                        rows={8}
                        className="form-control"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>
                <div className="row">
                    <button className="btn btn-primary" type="submit">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

