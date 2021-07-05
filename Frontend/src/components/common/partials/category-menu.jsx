import React from 'react'
import { Link } from 'react-router-dom'

function CategoryMenu() {
  function onShowMenu(e) {
    if (
      !document
        .querySelector('.category-dropdown.is-on')
        .classList.contains('show')
    ) {
      document.querySelector('.category-dropdown.is-on').classList.add('show')
      document
        .querySelector('.category-dropdown.is-on > .dropdown-menu')
        .classList.add('show')
    } else {
      document
        .querySelector('.category-dropdown.is-on')
        .classList.remove('show')
      document
        .querySelector('.category-dropdown.is-on > .dropdown-menu')
        .classList.remove('show')
    }
    e.preventDefault()
  }

  return (
    <div className={`dropdown category-dropdown is-on`}>
      <Link
        to="#"
        className="dropdown-toggle"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
        data-display="static"
        title="Browse Categories"
        onClick={onShowMenu}
      >
        Browse Categories
      </Link>

      <div className={`dropdown-menu`}>
        <nav className="side-nav">
          <ul className="menu-vertical sf-arrows sf-js-enabled">
            {categories.map((cat, i) => (
              <Category
                name={cat.name}
                banner={cat.banner}
                children={cat.children}
                icon={cat.icon}
                key={i}
              />
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )
}

const Category = ({ name, banner, icon, children, i }) => (
  <li className="megamenu-container" key={i}>
    <Link
      className="sf-with-ul"
      to={`/shop/list?product=${name.replace(/'\s'/g, '-')}`}
    >
      <i className={icon}></i>
      {name}
    </Link>

    {children && (
      <div className="megamenu">
        <div className="row no-gutters">
          <div className="col-md-8">
            <div className="menu-col">
              <div className="row">
                {children.map((product, i) => (
                  <div className="col-md-6">
                    <div className="menu-title">{product.name}</div>

                    <ul>
                      {product.children.map((child, i) => (
                        <li key={i}>
                          <Link
                            to={
                              child.link
                                ? child.link
                                : `/shop/list?product=${child.name.replace(
                                    ' ',
                                    '-'
                                  )}`
                            }
                          >
                            {child.strong ? (
                              <strong>{child.name}</strong>
                            ) : (
                              child.name
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="banner banner-overlay">
              <Link
                to={`${process.env.PUBLIC_URL}/shop/list`}
                className="banner banner-menu"
              >
                <img src={banner} alt="Banner" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    )}
  </li>
)

const categories = [
  {
    name: 'Electronics',
    banner: `${process.env.PUBLIC_URL}/assets/images/home/menu/banner-1.jpg`,
    icon: 'icon-laptop',
    children: [
      {
        name: 'Laptops & Computers',
        children: [
          {
            name: 'Desktop Computers',
          },
          {
            name: 'Monitors',
          },
          {
            name: 'Laptops',
          },
          {
            name: 'iPads & Tablets',
          },
          {
            name: 'Hard Drives & Storage',
          },
          {
            name: 'Printers & Supplies',
          },
          {
            name: 'Computer Accessories',
          },
        ],
      },
      {
        name: 'Digital Cameras',
        children: [
          {
            name: 'Digital SLR Cameras',
          },
          {
            name: 'Sports & Action Cameras',
          },
          {
            name: 'Camcorders',
          },
          {
            name: 'Camera Lenses',
          },
          {
            name: 'Photo Printer',
          },
          {
            name: 'Digital Memory Cards',
          },
          {
            name: 'Camera Bags, Backpacks & Cases',
          },
        ],
      },

      {
        name: 'Cell Phones',
        children: [
          {
            name: 'Carrier Phones',
          },
          {
            name: 'Unlocked Phones',
          },
          {
            name: 'Phone & Cellphone Cases',
          },
          {
            name: 'Cellphone Chargers',
          },
        ],
      },
      {
        name: 'TV & Video',
        children: [
          {
            name: 'TVs',
          },
          {
            name: 'Home Audio Speakers',
          },
          {
            name: 'Projectors',
          },
          {
            name: 'Media Streaming Devices',
          },
        ],
      },
    ],
  },
  {
    name: 'Furniture',
    banner: `${process.env.PUBLIC_URL}/assets/images/home/menu/banner-2.jpg`,
    icon: 'icon-couch',
    children: [
      {
        name: 'Bedroom',
        children: [
          {
            name: 'Beds, Frames & Bases',
          },
          {
            name: 'Dressers',
          },
          {
            name: 'Nightstands',
          },
          {
            name: "Kids' Beds & Headboards",
          },
        ],
      },
      {
        name: 'Living Room',
        children: [
          {
            name: 'Coffee Tables',
          },
          {
            name: 'Chairs',
          },
          {
            name: 'Tables',
          },
          {
            name: 'Futons & Sofa Beds',
          },
          {
            name: 'Cabinets & Chests',
          },
        ],
      },

      {
        name: 'Office',
        children: [
          {
            name: 'Office Chairs',
          },
          {
            name: 'Desks',
          },
          {
            name: 'Bookcases',
          },
          {
            name: 'File Cabinets',
          },
          {
            name: 'Breakroom Tables',
          },
        ],
      },
      {
        name: 'Kitchen & Dining',
        children: [
          {
            name: 'Dining Sets',
          },
          {
            name: 'Kitchen Storage Cabinets',
          },
          {
            name: 'Bakers Racks',
          },
          {
            name: 'Dining Chairs',
          },
          {
            name: 'Dining Room Tables',
          },
          {
            name: 'Bar Stools',
          },
        ],
      },
    ],
  },
  {
    name: 'Cooking',
    icon: 'icon-concierge-bell',
    banner: `${process.env.PUBLIC_URL}/assets/images/home/banners/banner-1.png`,
    children: [
      {
        name: 'Cookware',
        children: [
          {
            name: 'Cookware Sets',
          },
          {
            name: 'Pans, Griddles & Woks',
          },
          {
            name: 'Pots',
          },
          {
            name: 'Skillets & Grill Pans',
          },
          {
            name: 'Kettles',
          },
          {
            name: 'Soup & Stockpots',
          },
        ],
      },
      {
        name: 'Dinnerware & Tabletop',
        children: [
          {
            name: 'Plates',
          },
          {
            name: 'Cups & Mugs',
          },
          {
            name: 'Trays & Platters',
          },
          {
            name: 'Coffee & Tea Serving',
          },
          {
            name: 'Salt & Pepper Shaker',
          },
        ],
      },
      {
        name: 'Cooking Appliances',
        children: [
          {
            name: 'Microwaves',
          },
          {
            name: 'Coffee Makers',
          },
          {
            name: 'Mixers & Attachments',
          },
          {
            name: 'Slow Cookers',
          },
          {
            name: 'Air Fryers',
          },
          {
            name: 'Toasters & Ovens',
          },
        ],
      },
      {
        name: 'Kitchen & Dining',
        children: [
          {
            name: 'Dining Sets',
          },
          {
            name: 'Kitchen Storage Cabinets',
          },
          {
            name: 'Bakers Racks',
          },
          {
            name: 'Dining Chairs',
          },
          {
            name: 'Dining Room Tables',
          },
          {
            name: 'Bar Stools',
          },
        ],
      },
    ],
  },

  {
    name: 'Clothing',
    icon: 'icon-tshirt',
    banner: `${process.env.PUBLIC_URL}/assets/images/home/menu/banner-3.jpg`,
    children: [
      {
        name: 'Women',
        children: [
          {
            name: 'New Arrivals',
            strong: true,
          },
          {
            name: 'Best Sellers',
            strong: true,
          },
          {
            name: 'Trending',
            strong: true,
          },
          {
            name: 'Clothing',
          },
          {
            name: 'Shoes',
          },
          {
            name: 'Bags',
          },
          {
            name: 'Accessories',
          },
          {
            name: 'Jewlery & Watches',
          },
          {
            name: 'Sale',
            strong: true,
          },
        ],
      },
      {
        name: 'Men',
        children: [
          {
            name: 'New Arrivals',
            strong: true,
          },
          {
            name: 'Best Sellers',
            strong: true,
          },
          {
            name: 'Trending',
            strong: true,
          },
          {
            name: 'Clothing',
          },
          {
            name: 'Shoes',
          },
          {
            name: 'Bags',
          },
          {
            name: 'Accessories',
          },
          {
            name: 'Jewlery & Watches',
          },
        ],
      },
    ],
  },
  {
    name: 'Home Appliances',
    icon: 'icon-blender',
  },
  {
    name: 'Healthy & Beauty',
    icon: 'icon-heartbeat',
  },
  {
    name: 'Shoes & Boots',
    icon: 'icon-shoe-prints',
  },
  {
    name: 'Travel & Outdoor',
    icon: 'icon-map-signs',
  },
  {
    name: 'Smart Phones',
    icon: 'icon-mobile-alt',
  },
  {
    name: 'TV & Audio',
    icon: 'icon-tv',
  },
  {
    name: 'Backpack & Bag',
    icon: 'icon-shopping-bag',
  },
  {
    name: 'Musical Instruments',
    icon: 'icon-music',
  },
  {
    name: 'Gift Ideas',
    icon: 'icon-gift',
  },
]

export default React.memo(CategoryMenu)
