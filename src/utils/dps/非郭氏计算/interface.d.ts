import type { SkillBasicDTO, 技能增伤害类型 } from '@/@types/skill'

export interface 完整技能伤害入参类型 {
  当前技能属性: SkillBasicDTO
  最终人物属性: CharacterFinalDTO
  当前目标: TargetDTO
  技能总数?: number
  郭氏额外会效果值?: number
  额外会心率?: number
  郭式无视防御?: number
  技能增伤?: 技能增伤害类型
}
