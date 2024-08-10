const Container = ({ children, className }: any) => {
  return (
    <section
      className={`h-full w-full px-4 md:px-14 lg:px-12 xl:max-w-7xl ${className}`}
    >
      {children}
    </section>
  );
};

export default Container;
