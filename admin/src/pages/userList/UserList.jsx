import "./userList.css";
import { DataGrid } from '@mui/x-data-grid';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAllUsers } from '../../api2/apiCalls';
import {
  getUsersStart,
  getUsersSuccess,
  getUsersFailure,
  deleteUsersStart,
  deleteUsersSuccess,
  deleteUsersFailure,
} from '../../redux/usersRedux'
import { useDispatch, useSelector } from "react-redux";


export default function UserList() {
  const [data, setData] = useState(userRows);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);


  const getUsers = async () => {
    dispatch(getUsersStart());
    try {
      const res = await getAllUsers();
      if (res?.status == 200)
        dispatch(getUsersSuccess(res.data));
    } catch (err) {
      dispatch(getUsersFailure());
    };

  }

  useEffect(() => {
    getUsers()
  }, [dispatch])

  const handleDelete = async (id) => {
    dispatch(deleteUsersStart());
    try {
      // const res= await deleteProduct(id);
      dispatch(deleteUsersSuccess(id));
    } catch (err) {
      dispatch(deleteUsersFailure());
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "username",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        console.log(params.row.avatar)
        return (
          <div className="userListUser">
            <img className="userListImg" src={`{}${params.row.avatar}`} alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="action">
            <Link to={"/user/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutlineIcon
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={users}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
}

