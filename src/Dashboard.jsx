import { useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [modalAdd, setModalAdd] = useState(false);
  const [indexModal, setIndexModal] = useState(null);

  // add ref
  const inputNameAdd = useRef();
  const inputPriceAdd = useRef();
  const inputQtyAdd = useRef();
  // add edit
  const inputNameEdit = useRef();
  const inputPriceEdit = useRef();
  const inputQtyEdit = useRef();

  const [phones, setPhones] = useState(
    JSON.parse(localStorage.getItem("phones")) || []
  );
  const phonesList = phones.map((el, index) => {
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{el.name}</td>
        <td>{el.price}</td>
        <td>{el.qty}</td>
        <td>{el.price * el.qty}</td>
        <td>
          <div className="flex gap-4">
            <button
              className="btn btn-warning"
              onClick={() => openModalEdit(index)}
            >
              Edit
            </button>
            <button
              className="btn btn-error"
              onClick={() => handleRemoving(index)}
            >
              Remove
            </button>
          </div>
        </td>
      </tr>
    );
  });

  // remove function
  const handleRemoving = (index) => {
    let copy = [...phones];
    copy.splice(index, 1);
    setPhones(copy);
    localStorage.setItem("phones", JSON.stringify(copy));
  };
  // handle modal (add)
  const openModalAdd = () => {
    setModalAdd(true);
  };
  const closeModalAdd = () => {
    setModalAdd(false);
  };
  // add function
  const handleAdding = () => {
    let phone = {
      name: inputNameAdd.current.value,
      price: inputPriceAdd.current.value,
      qty: inputQtyAdd.current.value,
    };
    let copy = [...phones];
    copy.push(phone);
    setPhones(copy);
    closeModalAdd();
    localStorage.setItem("phones", JSON.stringify(copy));
  };
  // handle modal (edit)
  const openModalEdit = (index) => {
    setIndexModal(index);
    document.getElementById("editModal").showModal();
    let indexData = phones[index];
    inputNameEdit.current.value = indexData.name;
    inputPriceEdit.current.value = indexData.price;
    inputQtyEdit.current.value = indexData.qty;
  };
  // handle save update
  const handleSaving = () => {
    let phone = {
      name: inputNameEdit.current.value,
      price: inputPriceEdit.current.value,
      qty: inputQtyEdit.current.value,
    };
    let copy = [...phones];
    copy[indexModal] = phone;
    setPhones(copy);
    document.querySelector("#editModal").close();
    localStorage.setItem("phones", JSON.stringify(copy));
  };
  return (
    <>
      <section className="py-10">
        <div className="container px-6 lg:px-8 mx-auto">
          <div>
            <div className="mb-4 flex justify-between items-center">
              <button className="btn btn-primary" onClick={openModalAdd}>
                Add New Phone
              </button>
              <Link to="/products" className="btn btn-info">
                Go to Products
              </Link>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Item Name</th>
                  <th>Item Price</th>
                  <th>Item Qty</th>
                  <th>Item Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>{phonesList}</tbody>
            </table>
          </div>
        </div>
        {/* modalAdd */}
        {modalAdd && (
          <div
            className="inset-0 fixed bg-black/80 flex justify-center items-center"
            onClick={closeModalAdd}
          >
            <div
              onClick={(event) => {
                event.stopPropagation();
              }}
              className="w-[500px] p-4 border shadow rounded flex flex-col gap-3"
            >
              <h2>Add New Phone</h2>
              <input
                ref={inputNameAdd}
                type="text"
                placeholder="Enter phone name"
                className="input w-full"
              />
              <input
                ref={inputPriceAdd}
                type="number"
                placeholder="Enter phone price"
                className="input w-full"
              />
              <input
                ref={inputQtyAdd}
                type="number"
                placeholder="Enter phone qty"
                className="input w-full"
              />
              <button className="btn btn-success" onClick={handleAdding}>
                Add New Phone
              </button>
            </div>
          </div>
        )}
        {/* modalEdit */}
        <dialog
          id="editModal"
          className="modal inset-0 fixed bg-black/80 flex justify-center items-center"
          onClick={() => document.querySelector("#editModal").close()}
        >
          <div
            onClick={(event) => {
              event.stopPropagation();
            }}
            className="modal-box w-[500px] p-4 border shadow rounded flex flex-col gap-3"
          >
            <h2>Add New Phone</h2>
            <input
              ref={inputNameEdit}
              type="text"
              placeholder="Enter phone name"
              className="input w-full"
            />
            <input
              ref={inputPriceEdit}
              type="number"
              placeholder="Enter phone price"
              className="input w-full"
            />
            <input
              ref={inputQtyEdit}
              type="number"
              placeholder="Enter phone qty"
              className="input w-full"
            />
            <button className="btn btn-success" onClick={handleSaving}>
              Save New Phone
            </button>
          </div>
        </dialog>
      </section>
    </>
  );
}
