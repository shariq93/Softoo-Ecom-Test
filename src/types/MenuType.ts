export type MenuChildren = {
  name: string;
  categories: string[];
};

export type Menu = {
  name: string;
  img: string;
  children: MenuChildren[];
};
