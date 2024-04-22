import Swal from "sweetalert2";
import { UpdateRequest } from "../APIRequest/ApiRequest";

export function UpdateTodo(id, status) {
  return Swal.fire({
    title: "Update Status",
    input: "select",
    inputOptions: {
      New: "New",
      Completed: "Completed",
      Progress: "Progress",
      Canceled: "Canceled",
    },
    inputValue: status,
  })
    .then((result) => {
      if (result.isConfirmed) {
        UpdateRequest(id, result.value);
      } else {
        console.log("error");
      }
    })
    .catch((err) => {
      console.log("Error Alert", err);
    });
}
