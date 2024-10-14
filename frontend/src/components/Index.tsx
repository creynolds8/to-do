import { Link } from "react-router-dom";

const Index: React.FC = () => {
  return (
    <>
      <div className="flex flex-col items-center p-4 gap-6">
        <h1 className="text-3xl">Welcome!</h1>
        <div className="text-center">
          Here at <span className="text-xl italic"> To-Done </span> our goal is to make keeping 
          track of your tasks so easy that once they"re added, they"re already done!
        </div>
        <div className="w-full justify-start">
          <Link to={"/login"} className="button success bg-green-500">Login</Link> to view your todos
        </div>
        <div className="w-full justify-start">
          <Link to={"/register"} className="button success bg-green-500">Register</Link> to start tracking your tasks!
        </div>
        {/* <Link to={"/todos"}>*DEV* - Todos</Link> */}
      </div>
    </>
  );
};

export default Index;