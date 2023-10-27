import React from "react";

export const ContactForm = () => {
    return (
        <div className="container">
            <div className="row">
                <h1>Contact</h1>
            </div>
            <div className="row">
                <input type="text" className="form-control" id="name" placeholder="Name" />
            </div>
            <div className="row">
                <input type="text" className="form-control" id="email" placeholder="Email" />
            </div>
            <div className="row">
                <h6>Is this about a new recipe or an error on our site?</h6>

                <div className="form-check">
                    <input className="form-check-input mt-5" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                        I have an issue with the website
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input mt-5" type="radio" name="flexRadioDefault" id="flexRadioDefault2" defaultChecked />
                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                        I have a new recipe!
                    </label>
                </div>
            </div>
            <div className="row">
                <h6>Write us below!</h6>
                <textarea className="form-control" id="contact-form-info" rows="5"></textarea>
            </div>
            <div className="row">
                <button className="btn btn-primary">Submit</button>
            </div>
        </div>
    )
}

export default ContactForm;