// 'use client';

import Consumer from "@/components/consumer/consumer";
import Updater from "@/components/updater/updater";
import ReduxProvider from "@/store/reduxProvider";

import Slider from "@/components/slider/slider";

import styles from "./page.module.css";




export default function Home() {

  return (
    <>
      <main className={styles.main}>
        <Slider />
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat maiores aperiam adipisci quasi ex repudiandae, corporis harum dolores libero nobis molestiae odit nostrum cupiditate. Incidunt, sapiente! Nihil rerum labore voluptatibus.
      </main>
      {/* <ReduxProvider>

        <Consumer />

        <Updater />

      </ReduxProvider> */}
    </>
  );
}
