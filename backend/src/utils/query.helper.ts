export function applySearch(query: any, queryStr: any, fields = ["title"]) {
  if (!queryStr.keyword) return query;

  const regex = {
    $regex: queryStr.keyword,
    $options: "i"
  };

  const orConditions = fields.map((field) => ({ [field]: regex }));

  return query.find({ $or: orConditions });
};

export function applyFilters(query: any, queryStr: any) {
  const queryCopy = { ...queryStr };

  const removeFields = ["keyword", "page", "limit"];
  removeFields.forEach((key) => delete queryCopy[key]);

  return query.find(queryCopy);
};

export function applyPagination(query: any, queryStr: any, resultPerPage: number) {
  const page = Number(queryStr.page) || 1;
  const skip = (page - 1) * resultPerPage;
  return query.limit(resultPerPage).skip(skip);
};