import { ItemType } from '../enums'
import { CollectionItem, ICollectionItemData } from './CollectionItem'
import { SaveController } from '../components'
import { NarrativeController } from '../components/narrative/NarrativeController'

interface ILocationData extends ICollectionItemData {}

class Location extends CollectionItem {
  public constructor() {
    super()
    this.ItemType = ItemType.Location
  }

  public static Serialize(c: Location): ILocationData {
    const data = {
      id: c.ID,
      name: c.Name,
      description: c.Description,
      notes: c.Notes,
    }

    SaveController.Serialize(c, data)
    NarrativeController.Serialize(c, data)

    return data as ILocationData
  }

  Serialize(): ILocationData {
    return Location.Serialize(this)
  }

  Update(data: ILocationData) {
    this.ID = data.id
    this.Name = data.name
    this.Description = data.description
    this.Notes = data.notes
    NarrativeController.Deserialize(this, data)
    SaveController.Deserialize(this, data)
  }

  public static Deserialize(data: ILocationData): Location {
    const c = new Location()
    try {
      c.Update(data)
      c.SaveController.SetLoaded()
      return c
    } catch (err) {
      console.error(err)
    }
  }
}

export { Location, ILocationData }
