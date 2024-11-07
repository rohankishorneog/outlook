import { useEffect, useState } from "react";
import SelectedEmail from "@/components/SelectedEmail/SelectedEmail";
import FilterButton from "@/components/filterButton/FilterButton";
import EmailList from "@/components/list/EmailList/EmailList";
import { filters } from "@/constants";
import {
  fetchEmails,
  fetchEmailBody,
  setActiveFilter,
  selectFilteredEmails,
  selectActiveFilter,
} from "@/store/emailSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Email } from "@/types/types";

const EmailListPage = () => {
  const dispatch = useAppDispatch();

  // Use selectors for optimized state access
  const { loading, error } = useAppSelector((state) => state.emails);
  const filteredEmails = useAppSelector(selectFilteredEmails);
  const activeFilter = useAppSelector(selectActiveFilter);

  const [selectedMail, setSelectedMail] = useState<Email | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Function to handle email selection
  const handleSelectEmail = (email: Email) => {
    setSelectedMail(email);
    dispatch(fetchEmailBody(email.id));
  };

  // Function to handle going back to email list view
  const handleBack = () => {
    setSelectedMail(null);
  };

  // Function to handle filter changes
  const handleFilter = (filter: string) => {
    dispatch(setActiveFilter(filter));
    setSelectedMail(null);
    setCurrentPage(1); // Reset to the first page when changing filters
  };

  // Fetch emails when component mounts or page/filter changes
  useEffect(() => {
    dispatch(fetchEmails(currentPage));
  }, [dispatch, currentPage]);

  // Pagination controls
  const handleNextPage = () => {
    if (currentPage < 2) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-red-500">Error fetching emails: {error}</p>
      </div>
    );
  }

  return (
    <main className="flex flex-col p-10 h-screen">
      <div className="flex gap-5 items-center">
        <p className="text-gray-700 font-medium">Filter By:</p>

        <div className="flex gap-3">
          {filters.map((filter) => (
            <FilterButton
              key={filter.filter}
              filter={filter.filter}
              isActive={activeFilter === filter.filter}
              onClick={() => handleFilter(filter.filter)}
            />
          ))}
        </div>
      </div>

      <div className="flex gap-3 h-full w-full mt-5">
        <EmailList
          emails={filteredEmails}
          handleSelectEmail={handleSelectEmail}
          selectedMail={selectedMail}
        />
        {selectedMail && (
          <SelectedEmail email={selectedMail} handleBack={handleBack} />
        )}
      </div>

      {/* Pagination Controls */}
      {activeFilter === "all" && (
        <div className="flex justify-center mt-5 items-center">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="px-4 py-2 mx-2 text-sm bg-gray-200 rounded"
          >
            Previous
          </button>
          <span className="text-sm font-medium">
            Page {currentPage} of {2}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === 2}
            className="px-4 py-2 mx-2 text-sm bg-gray-200 rounded"
          >
            Next
          </button>
        </div>
      )}
    </main>
  );
};

export default EmailListPage;
