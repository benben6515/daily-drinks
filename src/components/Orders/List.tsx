import { ItemType } from '../../ts/interfaces'

const spanClass = 'text-sky-600'

interface ListPropsType {
  item: ItemType
}

export default ({ item }: ListPropsType) => (
  <li className=" base-card flex flex-col justify-start items-start">
    <div className="flex justify-between w-full base-width">
      <div>
        <span className={spanClass}>drink： </span>
        {item.name}
      </div>
      <div>$ {item.price}</div>
    </div>
    <div>
      <span className={spanClass}>name： </span>
      {item.owner}
    </div>
    <div className="flex">
      <span className={spanClass}>notes： </span>
      <ul className="flex flex-col text-slate-400">
        {item.notes.map((note: string) =>
          <li>{note}</li>
        )}
      </ul>
    </div>
    <hr className="w-full bg-slate-400 my-2" />
  </li>
)
