import React, { useState } from 'react'
import { TailSpin } from 'react-loader-spinner'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {

    deleteProductSuccess,
} from "../../redux/productRedux";
import { deleteProduct } from "../../api2/apiCalls";
const ListItem = ({ params }) => {
    const dispatch = useDispatch();

    const handleDelete = async (id) => {
        const res = await deleteProduct(id);
        if (res?.status == 200)
            dispatch(deleteProductSuccess(id));

        setDeleting(false)

    };
    const [deleting, setDeleting] = useState(false);

    return (
        <div className="edit">
            <Link to={"/product/" + params.row._id}>
                <button className="productListEdit">Edit</button>
            </Link>
            {deleting
                ? <TailSpin
                    visible={true}
                    height="20"
                    width="20"
                    color="gray"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    wrapperStyle={{ paddingRight: "10px" }}
                    wrapperClass=""

                />
                : <DeleteOutlineIcon
                    className="productListDelete"
                    onClick={() => {
                        setDeleting(true)
                        handleDelete(params.row._id)
                    }}
                />}

        </div>
    )
}

export default ListItem
