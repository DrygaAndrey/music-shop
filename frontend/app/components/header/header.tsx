
import Logo from "./headerComponents/logo/logo";
import Search from "./headerComponents/search/search";
import Contacts from "./headerComponents/contacts/contacts";

import styles from "./styles.module.scss";
import Cart from "./headerComponents/cart/cart";
import MyButton from "@/app/uiComponents/myButton/myButton";

function Header() {
    return (

        <header className={styles.header}>
            <div className="container">
                <div className={styles.outerWrapper} >
                    <Logo />
                    <div className={styles.innerWrapper}>
                        <MyButton>
                            <span className="material-symbols-outlined">widgets</span>
                        </MyButton>
                        <Search />

                    </div>
                    <div className={styles.innerWrapper}>
                        <Contacts />
                        <Cart />
                    </div>

                </div>
            </div>
        </header >


    );
}

export default Header;