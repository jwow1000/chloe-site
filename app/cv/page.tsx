// get tag from url, get post details
export default async function Cv() {

  return (
    <div className="flex flex-col justify-center gap-4 h-screen min-h-[calc(100vh-2rem)] p-[1rem_0_2rem_0] sm:p-[1rem_6rem_2rem_1rem]">
      <div className="relative w-full max-w-[1000px] min-h-screen">
        <iframe
          src="https://docs.google.com/document/d/e/2PACX-1vTMbbZC3qcOjJEuKU2VDYHUHioFV51KNcTIoPhlX0uJrJO_Dal_oFvQCDwmXi07oQ/pub?embedded=true"
          className="w-full h-full border-none"
          title="Chloe Engel CV"
        />
      </div>
    </div>
  );
}
