import { Response } from "express";

export const renderPage = (res: Response, page: string, title: string, data = {}) => {
  res.render(`pages/${page}`, {
    layout: 'layouts/index',
    pageTitle: title,
    ...data
  });
};