import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SERVER } from "../constants/server";

interface Props {
    comp : any
}

function AdminProtectedRoute({ comp }: Props) {
  const [child, setChild] = useState(<>Loading...</>);

  const isAuthed = () => {
    try {
      axios({
        method: "post",
        withCredentials: true,
        url: SERVER+"/admin/check-auth",
      })
        .then(() => {
            setChild(() => {return comp})
          return true;
        })
        .catch(() => {
            setChild(() => {return <><Link to="/admin/login">
            <button className="btn">Admin Login</button>
          </Link></>})
          return false;
        });
    } catch {
      return false;
    }
  };

  useEffect(() => {
    isAuthed()
  }, [])

  return <>{child}</>
}

export default AdminProtectedRoute;
