let users = [
  {
    id: "1",
    username: "bob",
    name: "bob",
    url: "",
    email: "bob@test.com",
    password: "$2b$12$IXpCLntIZBeyfGgdSAll3O1q6btjV1kKj.V822M2DLo6POeIcwJUm",
  },
  {
    username: "one",
    password: "$2b$12$Qp88jyROktIqdQZzYTyA7O0ZuY9jLvOwfp2DbxU/Akb7r38xLK3uS",
    name: "One",
    email: "one@test.com",
    url: "https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png",
    id: "1687848368285",
  },
];

export const findByUsername = async (username) => {
  return users.find((user) => user.username === username);
};

export const findById = async (userId) => {
  return users.find((user) => user.id === userId);
};

export const createUser = async (user) => {
  const created = {
    id: Date.now().toString(),
    createdAt: new Date(),
    ...user,
  };

  users.push(created);

  return created.id;
};
