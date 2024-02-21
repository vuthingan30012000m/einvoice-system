import { WardEntity } from '../entities/ward.entity';
import { Ward } from './../../../core/domain/entities/ward';

import { DistrictEntity } from '../entities/district.entity';

import { WardId } from './../../../core/domain/value-objects/ward-id';
import { DistrictId } from './../../../core/domain/value-objects/district-id';

export class WardAdapter {
  static toDomain(WardEntity: WardEntity): Ward {
    if (!WardEntity) return null;

    const WardModel = new Ward(new WardId(WardEntity.id));
    WardModel.name = WardEntity.name;

    // WardModel.districtId = new DistrictId(WardEntity.district.id);

    return WardModel;
  }

  static toPersistence(Ward: Ward): WardEntity {
    if (!Ward) return null;

    const entity = new WardEntity();

    entity.id = Ward.id.value;

    entity.name = Ward.name;

    const district = new DistrictEntity();
    district.id = Ward.districtId.value;
    entity.district = district;

    return entity;
  }
}
