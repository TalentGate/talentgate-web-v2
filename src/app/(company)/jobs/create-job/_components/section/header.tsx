interface HeaderProps {
  formPage: Number;
}

const Header = ({ formPage }: HeaderProps) => {
  return (
    <section>
      <h2 className="text-2xl font-semibold">Create New Job</h2>
      {formPage === 1 && (
        <p className="text-muted-foreground text-sm">
          Define title, description, department, location and location type of
          the job position to be created.
        </p>
      )}

      {formPage === 2 && (
        <p className="text-muted-foreground text-sm">
          Choose which application questions you'd like it to be required.
        </p>
      )}

      {formPage === 3 && (
        <p className="text-muted-foreground text-sm">
          Select observers for the job pipeline to be created.
        </p>
      )}

      {formPage === 4 && (
        <p className="text-muted-foreground text-sm">
          Choose at which platofrms would you like to publish your job post.
        </p>
      )}
    </section>
  );
};

export default Header;
