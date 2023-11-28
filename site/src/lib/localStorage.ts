export const PROJECT_LIST_LAYOUT = 'PROJECT_LIST_LAYOUT';

export function getProjectListLayout() {
  return (localStorage.getItem(PROJECT_LIST_LAYOUT) || 'list') as
    | 'list'
    | 'grid';
}

export function setProjectListLayout(layout: 'list' | 'grid') {
  localStorage.setItem(PROJECT_LIST_LAYOUT, layout);
}
