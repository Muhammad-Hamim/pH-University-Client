import { useGetAllAcademicSemestersQuery } from "../../../redux/features/academicSemester/academicSemesterApi";

const AcademicSemester = () => {
  const { data } = useGetAllAcademicSemestersQuery(undefined);
  console.log(data);
  return (
    <div>
      <h1>This is academic semester page.</h1>
    </div>
  );
};

export default AcademicSemester;
