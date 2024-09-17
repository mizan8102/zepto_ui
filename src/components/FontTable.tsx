import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { setFonts, deleteFont, triggerRefresh } from '../redux/fontsSlice';
import axiosInstance from '../helpers/axios/axiosInstance';

const loadFont = (fontName: string, fontUrl: string) => {
  const existingStyle = document.querySelector(`style[data-font-name="${fontName}"]`);
  if (existingStyle) {
    existingStyle.remove();
  }
  
  const style = document.createElement('style');
  style.setAttribute('data-font-name', fontName);
  style.appendChild(document.createTextNode(`
    @font-face {
      font-family: '${fontName}';
      src: url('${fontUrl}') format('truetype');
      font-weight: normal;
      font-style: normal;
      font-display: swap;
    }
  `));
  document.head.appendChild(style);
};

const FontTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { fonts, refresh } = useSelector((state: RootState) => state.fonts);

  useEffect(() => {
    const fetchFonts = async () => {
      try {
        const response = await axiosInstance.get('/fontList');
        const data = response.data;
        if (data.status === 'success') {
          dispatch(setFonts(data.data));
          data.data.forEach((font: { name: string; font_url: string }) => {
            loadFont(font.name, font.font_url);
          });
        } else {
          console.error('Error fetching fonts:', data.message);
        }
      } catch (error) {
        console.error('Error fetching fonts:', error);
      }
    };

    if (refresh) {
      fetchFonts();
    }
  }, [dispatch, refresh]);

  useEffect(() => {
    dispatch(triggerRefresh()); // Trigger refresh action when component mounts
  }, [dispatch]);

  const handleDelete = (id: number) => {
    axiosInstance.delete(`/font/${id}`)
      .then(() => dispatch(deleteFont(id)))
      .catch(error => console.error('Error deleting font:', error));
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Name</th>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Preview</th>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {fonts.map(font => (
            <tr key={font.id}>
              <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{font.name}</td>
              <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                <span style={{ fontFamily: font.name }}>
                  Example Style
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                <button
                  onClick={() => handleDelete(font.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FontTable;
