import { Ward } from 'src/user/core/domain/entities/ward';
import { WardEntity } from '../entities/ward.entity';
import { WardId } from 'src/user/core/domain/value-objects/ward-id';
import { DistrictId } from 'src/user/core/domain/value-objects/district-id';
import { DistrictEntity } from '../entities/district.entity';

export class WardAdapter {
  static toDomain(WardEntity: WardEntity): Ward {
    const WardModel = new Ward(new WardId(WardEntity.id));
    WardModel.name = WardEntity.name;
    WardModel.districtId = new DistrictId(WardEntity.district.id);

    return WardModel;
  }

  static toPersistence(Ward: Ward): WardEntity {
    const entity = new WardEntity();

    entity.id = Ward.id.value;

    entity.name = Ward.name;

    const district = new DistrictEntity();
    district.id = Ward.districtId.value;
    entity.district = district;

    return null;
  }
}
