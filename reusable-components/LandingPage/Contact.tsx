
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useFormik } from "formik";
import * as Yup from "yup";

const Contact = () => {
  // ✅ Définition du schéma de validation avec Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Adresse email invalide")
      .required("L’email est requis"),
    phone: Yup.string()
      .matches(/^[0-9]+$/, "Le numéro doit contenir uniquement des chiffres")
      .min(8, "Numéro trop court")
      .required("Le numéro est requis"),
    message: Yup.string()
      .min(10, "Le message doit contenir au moins 10 caractères")
      .required("Le message est requis"),
  });

  // ✅ Formik
  const formik = useFormik({
    initialValues: {
      email: "",
      phone: "",
      message: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Formulaire soumis :", values);
      alert("Votre message a été envoyé !");
    },
  });

  return (
    <section id="contact" className="py-16 bg-white">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-10">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Contactez-nous</h2>
          {/* ✅ Gestion via Formik */}
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <input
                type="email"
                name="email"
                placeholder="Votre adresse mail"
                className="w-full border rounded-lg px-4 py-3"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm">{formik.errors.email}</p>
              )}
            </div>

            {/* Téléphone */}
            <div>
              <input
                type="text"
                name="phone"
                placeholder="Votre numéro de téléphone"
                className="w-full border rounded-lg px-4 py-3 text-black"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.phone && formik.errors.phone && (
                <p className="text-red-500 text-sm">{formik.errors.phone}</p>
              )}
            </div>

            {/* Message */}
            <div>
              <textarea
                name="message"
                placeholder="Votre message"
                rows={4}
                className="w-full border rounded-lg px-4 py-3 text-black"
                value={formik.values.message}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></textarea>
              {formik.touched.message && formik.errors.message && (
                <p className="text-red-500 text-sm">{formik.errors.message}</p>
              )}
            </div>

            {/* Bouton */}
            <Button
              type="submit"
              className="bg-green-600 text-white hover:bg-green-700 w-full"
            >
              Envoyer
            </Button>
          </form>
        </motion.div>

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          className="rounded-lg overflow-hidden shadow-lg"
        >
          <iframe
            src="https://www.google.com/maps/embed?..."
            width="100%"
            height="400"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
