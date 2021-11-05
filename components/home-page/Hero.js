import Image from "next/image";

import styles from "./Hero.module.css";

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.image}>
        <Image
          src="/images/site/man.jpg"
          alt="An image showing author"
          width={300}
          height={300}
        />
      </div>
      <h1>Hi, I'm Bob</h1>
      <p>I blog about web development.</p>
    </section>
  );
};

export default Hero;
