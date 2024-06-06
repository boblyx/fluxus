import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { useActionContext } from "../contexts/ActionContext";
import { useAuthActions } from "../hooks/useAuthActions";
import { useNavigate } from "react-router-dom";
import ModelViewer from "../components/viewer/Viewer";
import TrialModelViewer from "../components/viewer/TrialViewer";
import NavBar from "../components/NavBar";
import ModelExport from "../components/ModelExport";
import { TOKEN, STREAM_ID, OBJECT_ID } from "../speckleUtils";

const ExportModel = () => {
  const navigate = useNavigate();
  const { state } = useActionContext();
  const { user } = state;
  const [token, setToken] = useState<string | null>();
  const [viewer, setViewer] = useState<React.ReactNode>(null);

  const streamId = localStorage.getItem(STREAM_ID);
  const objectId = localStorage.getItem(OBJECT_ID);

  const { fetchUser } = useAuthActions();
  const isAuthenticated = token !== null;

  useEffect(() => {
    setToken(localStorage.getItem(TOKEN));
    if (isAuthenticated) {
      fetchUser();
    }
    if (!isAuthenticated) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setViewer(streamId && objectId ? <ModelViewer /> : <TrialModelViewer />);
    }, 1000); // 1000 milliseconds delay

    return () => clearTimeout(timer); // Clean up the timer
  }, [streamId, objectId]);

  return (
    <div className="relative w-full h-full overflow-auto">
      <Header name={user?.name} />
      <NavBar />
      <ModelExport />
      {viewer}
    </div>
  );
};

export default ExportModel;
