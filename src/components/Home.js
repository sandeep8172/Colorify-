import classes from "./Home.module.css";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
const Home = () => {
    const [color, setColor] = useState({
        red: 0,
        green: 0,
        blue: 0,
    });
    const [getColor, setGetColor] = useState([]);
    const [isVisible, SetIsVisible] = useState(false);
    const [isEdite, setIsEdit] = useState(false);
    const history = useHistory();
    useEffect(() => {
        getColorBox();
    }, []);

    const changeValueHandler = (event) => {
        const value = event.target.value;
        setColor({
            ...color,
            [event.target.name]: value,
        });
    };
    const submitHandler = (event) => {
        event.preventDefault();
        const uId = localStorage.getItem("uId");
        axios
            .post(
                `https://colorify-auth-default-rtdb.firebaseio.com/color/${uId}.json`,
                color
            )
            .then((response) => {
                getColorBox();
            })
            .catch((error) => {
                console.log(error);
            });
        SetIsVisible(false);
    };
    const getColorBox = () => {
        const uId = localStorage.getItem("uId");
        axios
            .get(
                `https://colorify-auth-default-rtdb.firebaseio.com/color/${uId}.json`
            )
            .then((response) => {
                const transformedColor = [];
                for (let key in response.data) {
                    const getColors = {
                        id: key,
                        key: key,
                        red: response.data[key].red,
                        green: response.data[key].green,
                        blue: response.data[key].blue,
                    };
                    transformedColor.push(getColors);
                }
                setGetColor(transformedColor);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const deleteHandler = (id) => {
        const uId = localStorage.getItem("uId");
        axios
            .delete(
                `https://colorify-auth-default-rtdb.firebaseio.com/color/${uId}/${id}.json`
            )
            .then((response) => {
                getColorBox();
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const editHandler = (id) => {
        SetIsVisible(true);
        setIsEdit(true);
        localStorage.setItem("colorId", id)
    };
    const boxEditHandler = (event) => {
        let colorId = localStorage.getItem("colorId")
        let editedColor = {
            red: color.red,
            green: color.green,
            blue: color.blue,
        };
        const uId = localStorage.getItem("uId");
        axios.put(
            `https://colorify-auth-default-rtdb.firebaseio.com/color/${uId}/${colorId}.json`,
            editedColor
        ).then(() => {
            SetIsVisible(false)
            setIsEdit(false)
            getColorBox();
        }).catch((error) => {
            console.log(error);
        })
    }
    const colorBox = getColor.map((color) => {
        return (
            <section
                key={color.key}
                style={{
                    backgroundColor: `rgb(${color.red},${color.green},${color.blue})`,
                }}
            >
                <img
                    onClick={() => {
                        editHandler(color.id);
                    }}
                    className={classes.edit}
                    src="https://adityabhoir777.github.io/colorify/assets/pencil-8a15c3ef.png"
                />
                <img
                    onClick={() => {
                        deleteHandler(color.id);
                    }}
                    className={classes.delete}
                    src="https://adityabhoir777.github.io/colorify/assets/remove-f143b868.png"
                />
            </section>
        );
    });
    const toggleHandler = () => {
        SetIsVisible(true);
    };

    const signOutHandler = () => {
        history.replace("/");
    };

    return (
        <div className={classes.home}>

            {!isVisible ? (
                <div>
                    {colorBox}
                    <main>
                        <button onClick={toggleHandler} className={classes.boxButton}>
                            <img
                                className={classes.img_1}
                                src="	https://adityabhoir777.github.io/colorify/assets/add-plain-b830952c.png"
                                alt="add clor"
                            />
                        </button>
                    </main>
                </div>
            ) : (
                <div className={classes.range}>
                    <div
                        className={classes.color}
                        style={{
                            backgroundColor: `rgb(${color.red},${color.green},${color.blue})`,
                        }}
                    ></div>
                    <input
                        type="range"
                        min="0"
                        max="255"
                        name="red"
                        value={color.red}
                        onChange={changeValueHandler}
                    />
                    <input
                        type="range"
                        min="0"
                        max="255"
                        name="green"
                        value={color.green}
                        onChange={changeValueHandler}
                    />
                    <input
                        type="range"
                        min="0"
                        max="255"
                        name="blue"
                        value={color.blue}
                        onChange={changeValueHandler}
                    />
                    {isEdite ? <button onClick={() => { boxEditHandler(color.id) }} className={classes.editButton}>
                        <img
                            className={classes.editBox}
                            src="https://adityabhoir777.github.io/colorify/assets/pencil-8a15c3ef.png"
                        />
                    </button> : <button className={classes.formButton} onClick={submitHandler}>
                        <img
                            className={classes.img_2}
                            src="	https://adityabhoir777.github.io/colorify/assets/add-plain-b830952c.png"
                            alt="add clor"
                        />
                    </button>}


                </div>
            )}
            <footer>
                <button onClick={signOutHandler} className={classes.signOut}>
                    Sign Out
                </button>
            </footer>
        </div>
    );
};
export default Home;
