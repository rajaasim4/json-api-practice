import axios from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  price: Yup.number().required("Price is required"),
  category: Yup.string().required("Category is required"),
  description: Yup.string().required("Description is required"),
});
const UpdateProduct = () => {
  const updateProducts = async (data) => {
    const res = await axios.put(`https://dummyjson.com/products/${data.id}`);
  };
  const id = useParams();

  const mutation = useMutation({ mutationFn: (data) => updateProducts(data) });

  const handleSubmit = (values) => {
    mutation.mutate({
      id: id.productid,
      title: values.title,
      price: values.price,
      category: values.category,
      description: values.description,
    });
  };
  return (
    <>
      {mutation.isPending ? (
        "Updating Data..."
      ) : (
        <>
          {mutation.isError ? (
            <div>An error occurred: {mutation.error.message}</div>
          ) : null}

          {mutation.isSuccess ? (
            <div className="text-center text-xl mt-4">Data Updated!</div>
          ) : null}
        </>
      )}
      <div className="overflow-hidden">
        <Formik
          initialValues={{
            title: "",
            price: "",
            category: "",
            description: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formik) => {
            return (
              <Form>
                <div className=" mt-5">
                  <label htmlFor="title">Title</label>
                  <Field
                    className="py-2 px-2 border border-gray-400"
                    type="text"
                    id="title"
                    name="title"
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="error"
                  />
                </div>
                <div className=" mt-5">
                  <label htmlFor="price">Price</label>
                  <Field
                    className="py-2 px-2 border border-gray-400"
                    type="text"
                    id="price"
                    name="price"
                  />
                  <ErrorMessage
                    name="price"
                    component="div"
                    className="error"
                  />
                </div>
                <div className=" mt-5">
                  <label htmlFor="category">Category</label>
                  <Field
                    className="py-2 px-2 border border-gray-400"
                    type="text"
                    id="category"
                    name="category"
                  />
                  <ErrorMessage
                    name="category"
                    component="div"
                    className="error"
                  />
                </div>
                <div className=" mt-5">
                  <label htmlFor="description">Description</label>
                  <Field
                    className="py-2 px-2 border border-gray-400"
                    type="text"
                    id="description"
                    name="description"
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="error"
                  />
                </div>
                <div className=" mt-5">
                  <button
                    type="submit"
                    className="py-2 px-5 bg-red-300 rounded-lg"
                  >
                    Submit
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
};

export default UpdateProduct;
