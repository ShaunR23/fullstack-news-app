import { useState, useEffect } from "react";

import AdminUpdate from "./AdminUpdate";

function AdminList() {
  const [adminView, setAdminView] = useState(null);

  const handleError = (err) => {
    console.log(err);
  };

  useEffect(() => {
    const getSiteArticles = async () => {
      const response = await fetch("/api/v1/articles/admin").catch(handleError);

      if (!response.ok) {
        throw new Error("Network response was not OK!");
      } else {
        const data = await response.json();
        setAdminView(data);
      }
    };
    getSiteArticles();
  }, []);

  if (!adminView) {
    return <div>Fetching site data....</div>;
  }

  const adminFilterSub = adminView.filter(
    (article) => article.phase === "SUBMIT"
  );

  const adminSubmittedList = adminFilterSub.map((article) => (
    <AdminUpdate
      key={article.id}
      {...article}
      handleError={handleError}
      adminView={adminView}
      setAdminView={setAdminView}
    />
  ));

  const adminFilterRej = adminView.filter(
    (article) => article.phase === "REJECTED"
  );

  const adminRejectedList = adminFilterRej.map((article) => (
    <AdminUpdate
      key={article.id}
      {...article}
      handleError={handleError}
      adminView={adminView}
      setAdminView={setAdminView}
    />
  ));

  const adminFilterPub = adminView.filter(
    (article) => article.phase === "PUBLISHED"
  );

  const adminPublishedList = adminFilterPub.map((article) => (
    <AdminUpdate
      key={article.id}
      {...article}
      handleError={handleError}
      adminView={adminView}
      setAdminView={setAdminView}
    />
  ));

  const adminFilterArc = adminView.filter(
    (article) => article.phase === "ARCHIVED"
  );

  const adminArchivedList = adminFilterArc.map((article) => (
    <AdminUpdate
      key={article.id}
      {...article}
      handleError={handleError}
      adminView={adminView}
      setAdminView={setAdminView}
    />
  ));
  console.log(adminArchivedList);

  return (
    <div className="container">
      <h2>Submitted</h2>
      {adminSubmittedList}
      <h2>Published</h2>
      {adminPublishedList}
      <h2>Rejected</h2>
      {adminRejectedList}
      <h2>Archived</h2>
      {adminArchivedList}
    </div>
  );
}

export default AdminList;
