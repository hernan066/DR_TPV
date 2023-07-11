import { ErrorMessage, Field, Form, Formik } from "formik";
import styles from "./login.module.css";

import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Formato invalido").required("Requerido"),
  password: Yup.string().min(6, "6 caracteres mínimo").required("Requerido"),
});

const handleSubmit = () => {};

const isLoading = false;

export const Login = () => {
  return (
    <main className={styles.container}>
      <div className={styles.left}>
        <div className={styles.logo_container}>
          <img
            src="https://ik.imagekit.io/mrprwema7/logo_ZHIGAVlne.jpg?updatedAt=1689002315199"
            alt="logo"
          />
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.form_container}>
          <h2>Ingresa</h2>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={(values, { resetForm }) => {
              handleSubmit(values);
              resetForm();
            }}
          >
            {() => (
              <Form>
                <div className={styles.input__container}>
                  <img
                    src="https://ik.imagekit.io/mrprwema7/user_OkKLt0tst.png?updatedAt=1688138561573"
                    alt="icono usuario"
                  />
                  <Field
                    type="email"
                    name="email"
                    placeholder="Ingresa tu email"
                  />
                </div>

                <ErrorMessage
                  name="email"
                  component="p"
                  className="form__error"
                />
                <div className={styles.input__container}>
                  <img
                    src="https://ik.imagekit.io/mrprwema7/password_sMXDhy2rr.png?updatedAt=1688138561435"
                    alt="icono password"
                  />

                  <Field
                    type="password"
                    name="password"
                    placeholder="Ingresa tu contraseña"
                  />
                </div>
                <ErrorMessage
                  name="password"
                  component="p"
                  className="form__error"
                />

                <button
                  className={`btn-load ${isLoading ? "button--loading" : ""}`}
                  type="submit"
                  disabled={isLoading}
                  style={{ marginTop: "40px" }}
                >
                  <span className="button__text">Enviar</span>
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </main>
  );
};
