const HomeController = {
  Index: (req, res) => {
    res.render("sessions/new", { title: "Acebook", session: req.session });
  },
  About: (req, res) => {
    res.render("about", {title:"About Us",session: req.session });
  }
};

module.exports = HomeController;
