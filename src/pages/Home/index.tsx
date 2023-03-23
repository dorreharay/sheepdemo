/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import _ from 'lodash';
import type { ReduxStore } from '../../store/types'
import './styles.scss'

import { getCatalogue, deleteCatalogueItem } from '../../store/reducers/MainReducer';

function Home() {
  const dispatch = useDispatch()

  const catalogue = useSelector((state: ReduxStore) => state.main.catalogue);
  const loading = useSelector((state: ReduxStore) => state.main.loading);

  const [values, setValues] = useState<{ [x: string]: string }>({
    search: ''
  })
  const [sort, setSort] = useState<string |null>(null)
  const [filter, setFilter] = useState<string |null>(null)

  const handleDelete = (id: number | string) => {
    dispatch(deleteCatalogueItem(id))
  }

  const handleChange = (e: { target: { id: any; value: any; }; }) => {
    const field = e.target.id
    const value = e.target.value

    setValues({ [field]: value })
  }

  const list = useMemo(() => {
    const sorted = sort ? _.sortBy(catalogue?.products, [sort]) : catalogue?.products

    const filtered = filter ? sorted?.filter((item: any) => item[filter] === filter) : sorted

    if (values?.search) {
      const lowerCaseValue = (string: string | undefined) => {
        return string ? string.toLowerCase() : ''
      };

      const value = lowerCaseValue(values?.search)

      return filtered?.filter(item => {
        return (
          lowerCaseValue(item?.title)?.includes(value) ||
          lowerCaseValue(item?.description)?.includes(value) ||
          lowerCaseValue(item?.category)?.includes(value)
        )
      })
    } else {
      return filtered || []
    }
  }, [values?.search, catalogue?.products, sort])

  const loadCatalogue = () => {
    dispatch(getCatalogue())
  }

  useEffect(() => {
    loadCatalogue()
  }, [dispatch])

  type modifyItemType = {
    title: string,
    key: string
  }

  const availableModifiers: modifyItemType[] = [
    { title: 'Title', key: 'title' },
    { title: 'Description', key: 'description' },
    { title: 'Category', key: 'category' },
    { title: 'Price', key: 'price' },
    { title: 'Stock', key: 'stock' },
  ]

  const handleSort = (item: modifyItemType) => {
    setSort(prev => {
      if (prev !== item?.key) {
        return item?.key
      } else {
        return null
      }
    })
  }

  const handleFilter = (item: modifyItemType) => {
    setFilter(prev => {
      if (prev !== item?.key) {
        return item?.key
      } else {
        return null
      }
    })
  }

  if (loading) {
    return (
      <section className='home'>
        <div className='home__heading'>
          <h1>Loading...</h1>
        </div>
      </section>
    )
  }

  return (
    <section className='home'>
      <div className='home__heading'>
        <h1>Catalogue</h1>
        <Link className='addproduct' to='/add'>Add Product</Link>
        <button
          className='refresh'
          onClick={loadCatalogue}
        >
          Refresh
        </button>
      </div>

      <div className='searchbox'>
        <label htmlFor="search">
          Search
        </label>
        <input
          id="search"
          className='searchbox__input'
          onChange={handleChange}
          value={values?.search}
          placeholder="Search"
        />
      </div>

      <div className='sort'>
        Sort by:

        {availableModifiers?.map((item) => {
          return (
            <button
              className={`sort__option ${sort === item?.key ? 'active' : ''}`}
              onClick={() => handleSort(item)}
            >
              {item?.title}
            </button>
          )
        })}
      </div>

      <div className='list'>
        <table>
          <tbody>
            {list?.map((product) => {
              const firstProductImage = product?.images?.[0]

              return (
                <tr className='list__item' key={product?.id}>
                  <td>
                    {firstProductImage && (
                      <img
                        className='list__item--image'
                        src={firstProductImage}
                        key={firstProductImage}
                        alt={product?.title}
                      />
                    )}
                  </td>

                  <td className='list__item--title'>
                    {product?.title}
                  </td>

                  <td className='list__item--description'>
                    {product?.description}
                  </td>

                  <td className='list__item--price'>
                    Category: {product?.category}
                  </td>

                  <td className='list__item--price'>
                    Price: {product?.price}
                  </td>

                  <td className='list__item--price'>
                    Stock: {product?.stock}
                  </td>

                  <td className='list__item--price'>
                    Rating: {product?.rating}
                  </td>

                  <td>
                    <div className='list__item--actions'>
                      <button
                        className='delete'
                        onClick={() => handleDelete(product?.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Home;
