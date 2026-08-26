import { ArrowLeft, Flower2, ImagePlus, Megaphone, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCatalog } from '../context/catalogContext.js'
import { formatCurrency } from '../utils/currency.js'
import { toDisplayImageUrl } from '../utils/driveImage.js'

const initialForm = {
  name: '',
  categoryId: '1',
  price: '',
  salePrice: '',
  imageUrl: '',
  description: '',
  featured: true,
}

const initialAdvertisementForm = {
  title: '',
  imageUrl: '',
  linkUrl: '',
}

export function CatalogAdminPage() {
  const {
    addAdvertisement,
    addProduct,
    advertisements,
    categories,
    customProducts,
    removeAdvertisement,
    removeProduct,
  } = useCatalog()
  const [form, setForm] = useState(initialForm)
  const [advertisementForm, setAdvertisementForm] = useState(initialAdvertisementForm)
  const [message, setMessage] = useState('')
  const [advertisementMessage, setAdvertisementMessage] = useState('')
  const previewUrl = toDisplayImageUrl(form.imageUrl.trim())
  const advertisementPreviewUrl = toDisplayImageUrl(advertisementForm.imageUrl.trim())

  function updateField(event) {
    const { checked, name, type, value } = event.target
    setForm((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }))
    setMessage('')
  }

  function updateAdvertisementField(event) {
    setAdvertisementForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }))
    setAdvertisementMessage('')
  }

  function handleSubmit(event) {
    event.preventDefault()
    const product = addProduct(form)
    setForm(initialForm)
    setMessage(`Đã thêm “${product.name}” vào catalog trên thiết bị này.`)
  }

  function handleAdvertisementSubmit(event) {
    event.preventDefault()
    const advertisement = addAdvertisement(advertisementForm)
    setAdvertisementForm(initialAdvertisementForm)
    setAdvertisementMessage(`Đã thêm banner${advertisement.title ? ` “${advertisement.title}”` : ''} vào trang chủ.`)
  }

  return (
    <div className="catalog-admin-page">
      <header className="catalog-admin-header">
        <div>
          <p className="eyebrow">Route quản trị nội bộ</p>
          <h1>Thêm mẫu hoa</h1>
        </div>
        <Link className="secondary-button compact" to="/">
          <ArrowLeft size={17} /> Về cửa hàng
        </Link>
      </header>

      <div className="catalog-admin-notice">
        <Flower2 size={20} />
        <p>
          Dữ liệu được lưu trong trình duyệt hiện tại. Route này không hiện trên menu,
          nhưng không phải lớp bảo mật thực sự và không đồng bộ sang thiết bị khác.
        </p>
      </div>

      <main className="catalog-admin-layout">
        <form className="catalog-admin-form" onSubmit={handleSubmit}>
          <div className="catalog-admin-form-heading">
            <ImagePlus size={22} />
            <div>
              <h2>Thông tin sản phẩm</h2>
              <p>Dán link Drive đã bật quyền “Bất kỳ ai có đường liên kết”.</p>
            </div>
          </div>

          <label>Tên mẫu hoa
            <input name="name" required value={form.name} onChange={updateField} />
          </label>

          <div className="catalog-admin-two-columns">
            <label>Danh mục
              <select name="categoryId" value={form.categoryId} onChange={updateField}>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </label>
            <label>Giá bán
              <input name="price" min="0" required type="number" value={form.price} onChange={updateField} />
            </label>
          </div>

          <label>Giá khuyến mãi (không bắt buộc)
            <input name="salePrice" min="0" type="number" value={form.salePrice} onChange={updateField} />
          </label>

          <label>Link ảnh Google Drive
            <input
              name="imageUrl"
              placeholder="https://drive.google.com/file/d/.../view"
              required
              type="url"
              value={form.imageUrl}
              onChange={updateField}
            />
          </label>

          {previewUrl && (
            <div className="catalog-image-preview">
              <img src={previewUrl} alt="Xem trước ảnh sản phẩm" />
              <span>Xem trước ảnh</span>
            </div>
          )}

          <label>Mô tả
            <textarea name="description" required rows="4" value={form.description} onChange={updateField} />
          </label>

          <label className="catalog-featured-check">
            <input name="featured" type="checkbox" checked={form.featured} onChange={updateField} />
            Hiển thị ở trang chủ
          </label>

          {message && <p className="form-success">{message}</p>}

          <button className="primary-button" type="submit">
            <Plus size={18} /> Thêm sản phẩm
          </button>
        </form>

        <section className="catalog-admin-products">
          <div className="catalog-admin-form-heading">
            <Flower2 size={22} />
            <div>
              <h2>Sản phẩm đã thêm</h2>
              <p>{customProducts.length} sản phẩm lưu trên thiết bị này</p>
            </div>
          </div>

          {customProducts.length === 0 ? (
            <div className="catalog-admin-empty">Chưa có sản phẩm mới.</div>
          ) : (
            <div className="catalog-admin-product-list">
              {customProducts.map((product) => (
                <article key={product.id}>
                  <img src={product.imageUrl} alt={product.name} />
                  <div>
                    <strong>{product.name}</strong>
                    <span>{formatCurrency(product.salePrice || product.price)}</span>
                  </div>
                  <button type="button" onClick={() => removeProduct(product.id)} aria-label={`Xóa ${product.name}`}>
                    <Trash2 size={17} />
                  </button>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      <section className="catalog-admin-advertisements">
        <form className="catalog-admin-form" onSubmit={handleAdvertisementSubmit}>
          <div className="catalog-admin-form-heading">
            <Megaphone size={22} />
            <div>
              <h2>Banner quảng cáo cuộn</h2>
              <p>Ảnh sẽ xuất hiện thành một dải có thể vuốt/cuộn trên trang chủ.</p>
            </div>
          </div>

          <label>Tiêu đề quảng cáo (không bắt buộc)
            <input name="title" value={advertisementForm.title} onChange={updateAdvertisementField} />
          </label>

          <label>Link ảnh Google Drive
            <input
              name="imageUrl"
              placeholder="https://drive.google.com/file/d/.../view"
              required
              type="url"
              value={advertisementForm.imageUrl}
              onChange={updateAdvertisementField}
            />
          </label>

          <label>Link khi khách bấm vào ảnh (không bắt buộc)
            <input
              name="linkUrl"
              placeholder="https://..."
              type="url"
              value={advertisementForm.linkUrl}
              onChange={updateAdvertisementField}
            />
          </label>

          {advertisementPreviewUrl && (
            <div className="catalog-ad-preview">
              <img src={advertisementPreviewUrl} alt="Xem trước banner quảng cáo" />
              <span>Xem trước banner</span>
            </div>
          )}

          {advertisementMessage && <p className="form-success">{advertisementMessage}</p>}

          <button className="primary-button" type="submit">
            <Plus size={18} /> Thêm banner
          </button>
        </form>

        <div className="catalog-admin-products">
          <div className="catalog-admin-form-heading">
            <Megaphone size={22} />
            <div>
              <h2>Banner đã thêm</h2>
              <p>{advertisements.length} ảnh quảng cáo trên thiết bị này</p>
            </div>
          </div>

          {advertisements.length === 0 ? (
            <div className="catalog-admin-empty">Chưa có banner quảng cáo.</div>
          ) : (
            <div className="catalog-admin-ad-list">
              {advertisements.map((advertisement) => (
                <article key={advertisement.id}>
                  <img src={advertisement.imageUrl} alt={advertisement.title || 'Banner quảng cáo'} />
                  <div>
                    <strong>{advertisement.title || 'Banner không tiêu đề'}</strong>
                    <span>{advertisement.linkUrl || 'Không có liên kết'}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeAdvertisement(advertisement.id)}
                    aria-label="Xóa banner quảng cáo"
                  >
                    <Trash2 size={17} />
                  </button>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
