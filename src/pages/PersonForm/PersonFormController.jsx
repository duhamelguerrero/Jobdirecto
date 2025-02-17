import React from "react";
import axios from "axios";
import { LanguageContext } from "../../components/Language/LanguageContext";
import { BodyComponent } from "../../components/Body/BodyComponent";

export default class PersonForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { addClass: false };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            },
            () => {
                // console.log(this.state);
            }
        );
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.navigation.navigate("/PrePayPerson",{state:this.state});
    }

    render() {
        return (
            <BodyComponent toggleLanguage={this.props.navigation.toggleLanguage}>
            <div className="personForm">
                <form onSubmit={this.handleSubmit}>
                    <br />
                    <p className="formQuestions">Cual es su nombre?</p>
                    <input
                        className="formInputs"
                        type="text"
                        name="personName"
                        defaultValue={
                            this.state.personData && this.state.personData.data
                                ? this.state.personData.data.personName
                                : ""
                        }
                        required="required"
                        onChange={this.handleChange}
                    />

                    <br />
                    <br />
                    <p className="formQuestions"> Trabajo de que busca?</p>
                    <input
                        maxLength="30"
                        className="formInputs"
                        type="text"
                        name="personSkill"
                        defaultValue={
                            this.state.personData && this.state.personData.data
                                ? this.state.personData.data.personSkill
                                : ""
                        }
                        onChange={this.handleChange}
                    />
                    <p className="formQuestions"> Que experiencia tiene?</p>
                    <textarea
                        placeholder="Ponga detalles de lo que sabe hacer"
                        className="formInputs bigInput"
                        type="text"
                        name="personExperience"
                        defaultValue={
                            this.state.personData && this.state.personData.data
                                ? this.state.personData.data.personExperience
                                : ""
                        }
                        onChange={this.handleChange}
                    />
                    <p className="formQuestions">
                        Tiene alguna zona de preferencia?
                    </p>
                    <input
                        className="formInputs"
                        type="text"
                        name="personArea"
                        defaultValue={
                            this.state.personData && this.state.personData.data
                                ? this.state.personData.data.personArea
                                : ""
                        }
                        onChange={this.handleChange}
                    />
                    <p className="formQuestions">
                        Tiene algun horario de preferencia?
                    </p>
                    <input
                        className="formInputs"
                        type="text"
                        name="personSchedule"
                        defaultValue={
                            this.state.personData && this.state.personData.data
                                ? this.state.personData.data.personSchedule
                                : ""
                        }
                        onChange={this.handleChange}
                    />
                    <p className="formQuestions">
                        Cual es su numero de telefono?
                    </p>
                    <input
                        className="formInputs"
                        type="text"
                        name="personNumber"
                        defaultValue={
                            this.state.personData && this.state.personData.data
                                ? this.state.personData.data.personNumber
                                : ""
                        }
                        required="required"
                        onChange={this.handleChange}
                    />
                    <p className="formQuestions">Algo que desee agregar?</p>
                    <textarea
                        placeholder="Porque deberian contratarlo? Ponga sus mejores cualidades aqui"
                        className="formInputs bigInput"
                        type="text"
                        name="personExtraInfo"
                        defaultValue={
                            this.state.personData && this.state.personData.data
                                ? this.state.personData.data.personExtraInfo
                                : ""
                        }
                        onChange={this.handleChange}
                    />
                    <br />
                    {/**/}
                    <br />
                    <br />

                    <br />
                    <br />
                    <br />
                    <input
                        className="buttonBasic"
                        type="submit"
                        value="Listo"
                    />
                    <br />
                    <div className="contactInfo">
                        <p>{this.context.contactInfo.contactInfo}</p>
                    </div>

                    <br />
                    <br />
                </form>
            </div>
            </BodyComponent>
        );
    }
}

PersonForm.contextType = LanguageContext;
